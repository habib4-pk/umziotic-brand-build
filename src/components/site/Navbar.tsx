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
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
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

  /* Sticky scroll logic: detects scroll to add a subtle shadow to the main navbar */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      {/* 1. Announcement bar (static, top of page) */}
      {showAnnouncement && (
        <div className="w-full pt-2 z-40 px-4 sm:px-6 md:px-8">
          <div className="relative flex w-full items-center justify-center rounded-2xl border border-border/40 bg-[#F5F0E1] px-6 md:px-10 py-1.5 text-foreground shadow-sm">
          <p className="font-sans text-[13px] tracking-wide flex items-center gap-1.5">
            🌿 Pakistan's Trusted Herbal Wellness Brand
          </p>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="absolute right-6 md:right-10 text-foreground/60 transition-colors hover:text-foreground"
            aria-label="Dismiss announcement"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>
        </div>
      )}

      {/* 2. Main navbar (sticky) */}
      <header className="sticky top-2 z-50 w-full mt-2 px-4 sm:px-6 md:px-8">
        <div 
          className={`relative w-full rounded-2xl bg-primary px-6 md:px-10 transition-all duration-300 ${
              isScrolled ? "shadow-lift border border-white/10 bg-primary/95 backdrop-blur-md" : "shadow-md"
            }`}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:grid-cols-[auto_1fr_auto]">
          {/* Logo: keep exactly as it is */}
          <div className="min-w-0">
            <Logo />
          </div>

          {/* Nav links: only existing links, recolored to white/light for dark background */}
          <nav className="hidden justify-center gap-8 text-sm lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="relative py-1 text-white/80 transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                activeProps={{ className: "font-medium text-white after:w-full" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Icons: only existing icons, recolored to white for contrast */}
          <div className="flex shrink-0 items-center gap-3 text-white">
            <button 
              aria-label="Search" 
              className="hidden transition-colors hover:text-gold sm:block"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link to="/shop" aria-label="Wishlist" className="relative hidden transition-colors hover:text-gold sm:block">
              <Heart size={18} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] text-background">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/login" aria-label="Account" className="transition-colors hover:text-gold">
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative transition-colors hover:text-gold">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] text-background">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              aria-label="Menu"
              className="transition-colors hover:text-gold lg:hidden"
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
        </div>

        {/* Centered Floating Search Bar Below Navbar */}
        {showSearch && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowSearch(false)} 
              aria-hidden="true" 
            />
            <div className="absolute left-0 right-0 top-full pt-4 z-50 flex justify-center animate-in fade-in slide-in-from-top-2 duration-200">
              <form onSubmit={handleSearchSubmit} className="relative flex w-full max-w-md items-center mx-4">
                <Search size={18} strokeWidth={1.5} className="absolute left-4 text-muted-foreground" />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  name="q" 
                  placeholder="Search products, benefits, or ingredients..." 
                  className="w-full rounded-full border border-border bg-background py-3 pl-12 pr-12 text-sm text-foreground shadow-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold transition-all"
                />
                <button 
                  type="button" 
                  className="absolute right-4 p-1 text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setShowSearch(false)}
                  aria-label="Close search"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </form>
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
                      className: "bg-mint/30 font-medium text-primary",
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
    </>
  );
}

