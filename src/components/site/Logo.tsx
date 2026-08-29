import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.png";

export function Logo({ light = false, tagline = true }: { light?: boolean; tagline?: boolean }) {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src={logoImg} 
        alt="Umziotics" 
        className={`h-12 w-auto object-contain scale-[1.5] sm:scale-[1.7] origin-left ${light ? "brightness-0 invert opacity-90" : ""}`}
      />
    </Link>
  );
}
