import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    if (q.trim()) {
      setShowSearch(false);
      setOpen(false);
      navigate({ to: "/shop", search: { q: q.trim() } });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur relative">
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
          <button 
            aria-label="Search" 
            className="hidden sm:block hover:text-gold transition-colors"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
          <Link to="/shop" aria-label="Wishlist" className="relative hidden sm:block hover:text-gold transition-colors">
            <Heart size={18} strokeWidth={1.5} />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] text-background">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/login" aria-label="Account" className="hover:text-gold transition-colors">
            <User size={18} strokeWidth={1.5} />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative hover:text-gold transition-colors">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] text-background">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            aria-label="Menu"
            className="lg:hidden hover:text-gold transition-colors"
            onClick={() => {
              setOpen((o) => !o);
              setShowSearch(false);
            }}
          >
            {open ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <Menu size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Desktop & Mobile Search Dropdown Overlay */}
      {showSearch && (
        <>
          {/* Invisible backdrop to close on click outside */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowSearch(false)} 
            aria-hidden="true" 
          />
          <div className="absolute left-0 right-0 top-full z-50 border-b border-border bg-background/98 shadow-lift backdrop-blur-md" style={{ animation: "slideDown 0.2s ease-out" }}>
            <div className="section-x py-4">
              <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto flex items-center">
                <Search size={18} strokeWidth={1.5} className="absolute left-3 text-muted-foreground" />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  name="q" 
                  placeholder="Search products, benefits, or ingredients..." 
                  className="w-full bg-base-alt border-none rounded-full py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-gold outline-none"
                />
                <button 
                  type="button" 
                  className="absolute right-3 p-1 text-muted-foreground hover:text-primary transition-colors rounded-full"
                  onClick={() => setShowSearch(false)}
                  aria-label="Close search"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Mobile overlay menu — absolutely positioned so it overlaps page content */}
      {open && (
        <>
          {/* Backdrop overlay — click to close */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Slide-down menu panel */}
          <nav
            className="absolute left-0 right-0 top-full z-50 border-b border-border bg-background/98 shadow-lift backdrop-blur-md lg:hidden"
            style={{ animation: "slideDown 0.2s ease-out" }}
          >
            <div className="section-x flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-mint/40 hover:text-primary"
                  activeProps={{
                    className: "bg-mint/30 text-primary font-medium",
                  }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
              {/* Mobile-only quick links row */}
              <div className="mt-3 flex items-center gap-5 border-t border-border px-4 pt-4 text-muted-foreground">
                <button
                  aria-label="Search"
                  onClick={() => {
                    setOpen(false);
                    setShowSearch(true);
                  }}
                  className="flex items-center gap-2 text-sm transition-colors hover:text-primary"
                >
                  <Search size={16} strokeWidth={1.5} /> Search
                </button>
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-sm transition-colors hover:text-primary"
                >
                  <Heart size={16} strokeWidth={1.5} /> Wishlist
                  {wishlist.length > 0 && (
                    <span className="grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] text-background">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

