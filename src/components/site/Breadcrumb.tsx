import { Link } from "@tanstack/react-router";

export function Breadcrumb({ trail }: { trail: { label: string; to?: string }[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
      {trail.map((t, i) => (
        <span key={t.label} className="flex items-center gap-1.5">
          {t.to ? (
            <Link to={t.to} className="hover:text-primary">
              {t.label}
            </Link>
          ) : (
            <span className="text-primary">{t.label}</span>
          )}
          {i < trail.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
}
