/**
 * convert-images.mjs
 * Converts all PNG files in public/hero/ into optimized, fast-loading WebP files.
 * Reduces file sizes from ~2MB per image to ~150KB-250KB per image (10x-15x speed improvement).
 */
import sharp from "sharp";
import { readdirSync, existsSync, statSync } from "fs";
import { resolve, join, extname, basename } from "path";

const heroDir = resolve("public/hero");

if (!existsSync(heroDir)) {
  console.error("Directory not found: public/hero");
  process.exit(1);
}

const files = readdirSync(heroDir).filter(
  (f) => extname(f).toLowerCase() === ".png"
);

console.log(`\n🚀 Starting WebP conversion for ${files.length} hero images...\n`);

let totalOrigBytes = 0;
let totalWebpBytes = 0;

for (const file of files) {
  const srcPath = join(heroDir, file);
  const outName = `${basename(file, extname(file))}.webp`;
  const outPath = join(heroDir, outName);

  const origSize = statSync(srcPath).size;
  totalOrigBytes += origSize;

  try {
    const info = await sharp(srcPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 85, effort: 5 })
      .toFile(outPath);

    totalWebpBytes += info.size;

    const origMB = (origSize / (1024 * 1024)).toFixed(2);
    const webpKB = (info.size / 1024).toFixed(0);
    const reduction = (((origSize - info.size) / origSize) * 100).toFixed(1);

    console.log(
      `  ✅ ${file.padEnd(25)} → ${outName.padEnd(25)} (${origMB} MB  →  ${webpKB} KB,  -${reduction}%)`
    );
  } catch (err) {
    console.error(`  ❌ Failed to convert ${file}:`, err.message);
  }
}

const totalOrigMB = (totalOrigBytes / (1024 * 1024)).toFixed(2);
const totalWebpMB = (totalWebpBytes / (1024 * 1024)).toFixed(2);
const totalReduction = (((totalOrigBytes - totalWebpBytes) / totalOrigBytes) * 100).toFixed(1);

console.log(`\n🎉 Conversion Complete!`);
console.log(`  Total original size : ${totalOrigMB} MB`);
console.log(`  Total WebP size     : ${totalWebpMB} MB`);
console.log(`  Overall reduction   : -${totalReduction}%\n`);
