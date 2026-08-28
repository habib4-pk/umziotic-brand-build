import { Link } from "@tanstack/react-router";

export function Logo({ light = false, tagline = true }: { light?: boolean; tagline?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <svg viewBox="0 0 48 48" className="h-9 w-9 shrink-0" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={light ? "text-gold/70" : "text-gold"}
        />
        <path
          d="M32 14c0 11-6 18-14 20 0-11 6-18 14-20z"
          className="fill-gold"
          opacity="0.95"
        />
        <path
          d="M18 34c2-8 6-13 12-17"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={light ? "text-background" : "text-primary"}
        />
      </svg>
      <span className="leading-tight">
        <span
          className={`block font-display text-lg font-semibold tracking-[0.14em] ${light ? "text-background" : "text-primary"}`}
        >
          UMZIOTIC
        </span>
        {tagline && (
          <span
            className={`block text-[0.6rem] ${light ? "text-background/70" : "text-muted-foreground"}`}
          >
            Transform Yourself Naturally.
          </span>
        )}
      </span>
    </Link>
  );
}
