import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useShop } from "@/context/shop";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { cartCount, wishlist } = useShop();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="section-x grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:grid-cols-[auto_1fr_auto]">
        <div className="min-w-0">
          <Logo />
        </div>

        <nav className="hidden justify-center gap-8 text-sm lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-medium" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 text-primary">
          <button aria-label="Search" className="hidden sm:block">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <Link to="/shop" aria-label="Wishlist" className="relative hidden sm:block">
            <Heart size={18} strokeWidth={1.5} />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] text-background">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/login" aria-label="Account">
            <User size={18} strokeWidth={1.5} />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] text-background">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            aria-label="Menu"
            className="lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="section-x flex flex-col gap-3 border-t border-border py-4 text-sm lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-muted-foreground"
              activeProps={{ className: "text-primary font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
