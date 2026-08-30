import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X, Sparkles, ShieldCheck, Tag, ArrowRight } from "lucide-react";
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

const popularSearches = ["Hair Growth", "Skin Glow", "Weight Loss", "Men's Vitality", "Detox Tea"];

export function Navbar() {
  const { cartCount, wishlist } = useShop();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  /* Prevent body scrolling when mobile menu drawer is active */
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

  /* Focus search input when modal opens */
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  /* Handle scroll threshold for dynamic glassmorphic elevation */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      setShowSearch(false);
      setOpen(false);
      navigate({ to: "/shop", search: { q: query.trim() } });
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    handleSearchSubmit(q || "");
  };

  return (
    <>
      {/* 
        1. STITCH STYLED ANNOUNCEMENT BAR 
        Deep Emerald (#0A3C2F) gradient wash with Gold Leaf (#D4AF37) borders & sparkles
      */}
      {showAnnouncement && (
        <div className="w-full pt-1 z-40 px-3 sm:px-5 md:px-6">
          <div className="relative flex w-full items-center justify-between overflow-hidden rounded-xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#031711] via-[#0A3C2F] to-[#0E231D] px-4 sm:px-6 py-1.5 text-white shadow-md">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium tracking-wide">
              <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
                <Sparkles size={14} className="animate-pulse text-[#FFD700]" />
                Umziotics Botanical Apothecary
              </span>
              <span className="hidden md:inline opacity-30 text-[#D4AF37]">|</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-100/90">
                <Tag size={13} className="text-[#D4AF37]" />
                Use Code <strong className="text-[#D4AF37] font-bold">UMZIOTIC10</strong> for 10% Off | Free Delivery Over Rs. 2,999
              </span>
              <span className="sm:hidden text-emerald-100">🌿 Free Delivery Over Rs. 2,999</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden lg:flex items-center gap-1.5 text-xs text-[#D4AF37] font-medium tracking-wide uppercase">
                <ShieldCheck size={14} /> 100% Lab Tested Purity
              </span>
              <button
                onClick={() => setShowAnnouncement(false)}
                className="rounded-full p-1 text-emerald-100/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Dismiss announcement"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        2. STITCH FLOATING GLASSMORTIC NAVBAR 
        Employs dark mode luxury aesthetic with Emerald canvas, backdrop blur & subtle gold glow borders
      */}
      <header className="sticky top-0 z-50 w-full mt-1 px-3 sm:px-5 md:px-6">
        <div
          className={`relative w-full rounded-2xl px-4 sm:px-6 py-2 transition-all duration-300 ${
            isScrolled
              ? "bg-[#0A3C2F]/95 backdrop-blur-xl border border-[#D4AF37]/35 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              : "bg-[#0A3C2F]/90 backdrop-blur-md border border-[#D4AF37]/20 shadow-xl hover:border-[#D4AF37]/30"
          }`}
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
            {/* Brand Logo */}
            <div className="min-w-0 flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden justify-center gap-1 lg:flex items-center">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="relative px-4 py-2 text-sm font-medium text-emerald-100/80 transition-all duration-200 hover:text-white hover:bg-white/10 rounded-full group tracking-wider uppercase"
                  activeProps={{ className: "font-semibold text-white bg-white/15 shadow-inner" }}
                >
                  {l.label}
                  {/* Gold Bloom Underline Active Accent */}
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#FFD700] scale-x-0 transition-transform duration-300 group-hover:scale-x-100 rounded-full shadow-[0_0_8px_#D4AF37]" />
                </Link>
              ))}
            </nav>

            {/* Action Buttons Cluster */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3 text-white">
              {/* Search Toggle Icon */}
              <button
                aria-label="Search"
                className="flex items-center justify-center h-10 w-10 rounded-full text-emerald-100 transition-all duration-200 hover:bg-white/10 hover:text-[#D4AF37] hover:scale-105 active:scale-95"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search size={19} strokeWidth={1.75} />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/shop"
                aria-label="Wishlist"
                className="relative hidden sm:flex items-center justify-center h-10 w-10 rounded-full text-emerald-100 transition-all duration-200 hover:bg-white/10 hover:text-[#D4AF37] hover:scale-105 active:scale-95"
              >
                <Heart size={19} strokeWidth={1.75} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#D4AF37] px-1 text-[0.65rem] font-extrabold text-slate-950 shadow-[0_0_10px_#D4AF37] animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Account Link */}
              <Link
                to="/login"
                aria-label="Account"
                className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full text-emerald-100 transition-all duration-200 hover:bg-white/10 hover:text-[#D4AF37] hover:scale-105 active:scale-95"
              >
                <User size={19} strokeWidth={1.75} />
              </Link>

              {/* Shopping Cart Link */}
              <Link
                to="/cart"
                aria-label="Cart"
                className="relative flex items-center justify-center h-10 w-10 rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-[#D4AF37] hover:text-slate-950 hover:scale-105 active:scale-95 shadow-md"
              >
                <ShoppingBag size={19} strokeWidth={1.75} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#FFD700] text-slate-950 px-1 text-[0.7rem] font-black shadow-[0_0_10px_#FFD700] border border-[#0A3C2F]">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                aria-label="Menu"
                className="flex items-center justify-center h-10 w-10 rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
                onClick={() => {
                  setOpen((o) => !o);
                  setShowSearch(false);
                }}
              >
                {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
              </button>
            </div>
          </div>
        </div>

        {/* 
          3. STITCH GLASSMORTIC SEARCH DRAWER 
          Features instant suggestions & high contrast obsidian background
        */}
        {showSearch && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
              onClick={() => setShowSearch(false)}
              aria-hidden="true"
            />
            <div className="absolute left-0 right-0 top-full pt-3 z-50 flex justify-center animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="w-full max-w-xl mx-4 bg-[#082820]/95 border border-[#D4AF37]/40 backdrop-blur-2xl p-5 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                <form onSubmit={onFormSubmit} className="relative flex items-center">
                  <Search size={20} strokeWidth={1.75} className="absolute left-4 text-[#D4AF37]" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    name="q"
                    placeholder="Search organic formulas, benefits, or ingredients..."
                    className="w-full rounded-full border border-emerald-800/60 bg-[#031711] py-3.5 pl-12 pr-12 text-sm text-emerald-50 placeholder:text-emerald-300/50 shadow-inner outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40 transition-all font-medium"
                  />
                  <button
                    type="button"
                    className="absolute right-4 p-1 rounded-full text-emerald-300/70 transition-colors hover:bg-white/10 hover:text-white"
                    onClick={() => setShowSearch(false)}
                    aria-label="Close search"
                  >
                    <X size={18} strokeWidth={2} />
                  </button>
                </form>

                {/* Popular Searches Bar */}
                <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-emerald-800/40">
                  <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mr-1 flex items-center gap-1">
                    <Sparkles size={12} /> Popular:
                  </span>
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleSearchSubmit(term)}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-900/60 text-emerald-100 hover:bg-[#D4AF37] hover:text-slate-950 transition-all duration-150 border border-emerald-700/40"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* 
          4. STITCH MOBILE NAVIGATION DRAWER
          Full responsive slide-down menu with dark luxury theme
        */}
        {open && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <nav
              className="absolute left-0 right-0 top-full mt-3 z-50 rounded-2xl border border-[#D4AF37]/30 bg-[#0A3C2F]/98 p-5 text-white shadow-2xl backdrop-blur-2xl lg:hidden"
              style={{ animation: "slideDown 0.25s ease-out" }}
            >
              <div className="flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-emerald-100 transition-all hover:bg-white/10 hover:text-white hover:pl-5"
                    activeProps={{
                      className: "bg-white/15 font-semibold text-[#D4AF37] shadow-sm",
                    }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    <span>{l.label}</span>
                    <ArrowRight size={16} className="opacity-40" />
                  </Link>
                ))}

                {/* Mobile Quick Action Buttons Grid */}
                <div className="mt-4 pt-4 border-t border-emerald-800/60 grid grid-cols-3 gap-2">
                  <button
                    aria-label="Search"
                    onClick={() => {
                      setOpen(false);
                      setShowSearch(true);
                    }}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-950/60 hover:bg-white/15 text-emerald-100 transition-all text-xs font-medium gap-1.5 border border-emerald-800/40"
                  >
                    <Search size={18} className="text-[#D4AF37]" />
                    Search
                  </button>

                  <Link
                    to="/shop"
                    onClick={() => setOpen(false)}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-950/60 hover:bg-white/15 text-emerald-100 transition-all text-xs font-medium gap-1.5 relative border border-emerald-800/40"
                  >
                    <Heart size={18} className="text-[#D4AF37]" />
                    Wishlist
                    {wishlist.length > 0 && (
                      <span className="absolute top-2 right-2 grid h-4 min-w-4 place-items-center rounded-full bg-[#D4AF37] text-slate-950 text-[0.6rem] font-bold">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-950/60 hover:bg-white/15 text-emerald-100 transition-all text-xs font-medium gap-1.5 border border-emerald-800/40"
                  >
                    <User size={18} className="text-[#D4AF37]" />
                    Account
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
