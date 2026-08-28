import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" },
      { label: "Bestsellers", to: "/shop" },
      { label: "New Arrivals", to: "/shop" },
      { label: "Categories", to: "/shop" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Our Ingredients", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "FAQs", to: "/contact" },
      { label: "Shipping & Returns", to: "/contact" },
      { label: "Privacy Policy", to: "/contact" },
      { label: "Terms & Conditions", to: "/contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="section-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Premium herbal supplements crafted from nature for a healthier, happier you.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-base text-gold">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-display text-base text-gold">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex items-start gap-2">
              <Phone size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
              +92 300 1234567
            </li>
            <li className="flex items-start gap-2">
              <Mail size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
              hello@umziotic.com
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
              Lahore, Pakistan
            </li>
          </ul>
          <div className="mt-5 flex gap-3 text-gold">
            <a href="#" aria-label="Instagram">
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook size={18} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="YouTube">
              <Youtube size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs text-primary-foreground/60">
        © 2024 Umziotic. All Rights Reserved.
      </div>
    </footer>
  );
}
