export interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const sampleHeroSlides: HeroSlide[] = [
  {
    id: "hair-growth",
    imageUrl: "/hero/Hair-Growth-Hero.png",
    title: "Revitalize Your Hair Naturally",
    subtitle: "Nourish your scalp with 100% pure botanical herbs for stronger, thicker hair and root revival.",
    ctaText: "Shop Hair Care",
    ctaLink: "/shop",
  },
  {
    id: "healthy-skin",
    imageUrl: "/hero/Healthy-Skin-Hero.png",
    title: "Glow With Natural Radiance",
    subtitle: "Clean herbal detox and skin rejuvenation formulas crafted for lasting health and beauty.",
    ctaText: "Discover Skin Care",
    ctaLink: "/shop",
  },
  {
    id: "mens-vitality",
    imageUrl: "/hero/Mens-Vitaliy-Hero.png",
    title: "Boost Men's Vitality & Energy",
    subtitle: "Premium organic formulation designed to enhance natural stamina, strength, and overall wellness.",
    ctaText: "Explore Vitality Formula",
    ctaLink: "/shop",
  },
  {
    id: "height-growth",
    imageUrl: "/hero/Height-Growth-Hero.png",
    title: "Unlock Natural Growth Potential",
    subtitle: "Essential organic nutrient blend formulated to support bone development and height growth.",
    ctaText: "Explore Height Growth",
    ctaLink: "/shop",
  },
  {
    id: "weight-loss",
    imageUrl: "/hero/Weight-Loss-Hero.png",
    title: "Achieve Your Ideal Fitness Goals",
    subtitle: "Boost metabolism and burn fat naturally with organic green teas & potent botanical extracts.",
    ctaText: "Shop Slimming Detox",
    ctaLink: "/shop",
  },
  {
    id: "weight-gain",
    imageUrl: "/hero/Weight-Gain-Hero.png",
    title: "Build Strength & Healthy Mass",
    subtitle: "Rich herbal blend formulated for optimal appetite enhancement, muscle recovery, and stamina.",
    ctaText: "View Weight Gain",
    ctaLink: "/shop",
  },
];
