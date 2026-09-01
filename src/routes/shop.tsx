import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Search, Filter, LayoutGrid, List, ChevronDown, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, CONCERNS, categoryCounts, formatPKR, products } from "@/lib/products";
import shopHero from "@/assets/shop-hero.png";
import shopHeroMobile from "@/assets/shop-hero-mobile.jpg";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { q?: string | undefined } => {
    return {
      q: typeof search["q"] === "string" ? search["q"] : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Shop Herbal Supplements — Umziotic" },
      {
        name: "description",
        content:
          "Browse Umziotic herbal supplements for hair care, immunity, skin, detox and weight management. Filter by concern and price.",
      },
      { property: "og:title", content: "Shop Herbal Supplements — Umziotic" },
      {
        property: "og:description",
        content: "Filter premium herbal formulas by category, concern and price.",
      },
    ],
  }),
  component: Shop,
});

const PER_PAGE = 6;

function Shop() {
  const searchParams = Route.useSearch();
  const [cats, setCats] = useState<string[]>([]);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [appliedPrice, setAppliedPrice] = useState(5000);
  const [query, setQuery] = useState(searchParams.q || "");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggle = (list: string[], set: (v: string[]) => void, value: string) => {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const out = products.filter(
      (p) =>
        (cats.length === 0 || cats.includes(p.category)) &&
        (concerns.length === 0 || p.concerns.some((c) => concerns.includes(c))) &&
        p.price <= appliedPrice &&
        p.name.toLowerCase().includes(query.toLowerCase()),
    );
    if (sort === "low") out.sort((a, b) => a.price - b.price);
    if (sort === "high") out.sort((a, b) => b.price - a.price);
    if (sort === "rating") out.sort((a, b) => b.rating - a.rating);
    return out;
  }, [cats, concerns, appliedPrice, query, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <>
      <div className="w-full px-3 sm:px-5 md:px-6 pt-3 pb-4">
        {/* BANNER */}
        <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-[#F5F0E1] sm:h-[520px] md:h-[72vh] lg:h-[76vh] max-h-[650px] flex items-center">
          
          {/* Mobile Image (Normal flow so it defines container height without cropping) */}
          <img src={shopHeroMobile} alt="Umziotic Shop Banner" className="w-full h-auto block sm:hidden" />
          
          {/* Desktop Image (Absolute cover) */}
          <div className="absolute inset-0 w-full h-full hidden sm:block">
            <img src={shopHero} alt="Umziotic Shop Banner" className="w-full h-full object-cover object-[right_15%]" />
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 z-10 py-6 px-6 sm:py-8 sm:px-12 md:py-12 md:px-16 lg:py-16 lg:px-24 xl:px-32 w-full max-w-2xl flex flex-col justify-end pb-8 sm:justify-center sm:pb-8">
            {/* Desktop heading (Hidden on mobile since image contains text) */}
            <h2 className="hidden sm:block font-display text-4xl md:text-5xl lg:text-[3.5rem] text-primary leading-[1.1]">
              Nature's Best,<br />
              For Your <span className="text-gold italic font-medium">Best Self.</span>
            </h2>
            {/* Desktop subtext (Hidden on mobile since image contains text) */}
            <p className="hidden sm:block mt-4 text-primary/80 text-sm md:text-base font-medium">
              Premium herbal wellness, made for you.
            </p>
            {/* CTA Button is pushed to bottom on mobile */}
            <div className="mt-auto sm:mt-8">
              <button 
                onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary !rounded-full px-6 py-3 sm:px-8 sm:py-3.5 shadow-md hover:shadow-lg text-sm font-medium transition-all hover:scale-105 active:scale-95"
              >
                Explore Collections
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="collections" className="section-x pb-12">
        
        {/* Intro Text */}
        <div className="mb-10 max-w-5xl">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider uppercase text-primary mb-4">
            All Products
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            At Umziotic, we aim to provide you with premium quality products packed with purity of nature & goodness of science. We offer a wide range of herbal supplements to support your nutritional needs & general wellness.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className={`space-y-8 ${showMobileFilters ? "block" : "hidden"} lg:block`}>
          <div>
            <h2 className="text-[13px] font-bold tracking-[0.15em] uppercase text-primary">Filters</h2>
          </div>
          <div>
            <h3 className="text-sm font-medium text-primary">Category</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {categoryCounts.map((c) => (
                <li key={c.name} className="flex items-center justify-between gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="accent-primary"
                      checked={cats.includes(c.name)}
                      onChange={() => toggle(cats, setCats, c.name)}
                    />
                    {c.name}
                  </label>
                  <span className="text-xs">({c.count})</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-primary">Price</h3>
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={maxPrice}
              aria-label="Maximum price"
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-4 w-full accent-primary"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>PKR 0</span>
              <span>{formatPKR(maxPrice)}</span>
            </div>
            <button
              className="btn-gold mt-3 px-5 py-1.5 text-xs"
              onClick={() => {
                setAppliedPrice(maxPrice);
                setPage(1);
              }}
            >
              Apply
            </button>
          </div>

          <div>
            <h3 className="text-sm font-medium text-primary">Concern</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {CONCERNS.map((c) => (
                <li key={c}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="accent-primary"
                      checked={concerns.includes(c)}
                      onChange={() => toggle(concerns, setConcerns, c)}
                    />
                    {c}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div>
          {/* Mobile Header */}
          <div className="lg:hidden mb-6 space-y-4 relative z-50">
            
            <div className="relative min-w-0 flex-1 group mt-1">
              <Search size={18} strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-[#D4AF37] transition-colors" />
              <input
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-primary/15 shadow-sm text-sm text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
                placeholder="Search products..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              />
            </div>

            <div className="flex items-center justify-between border-y border-border py-3">
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 text-sm font-medium text-primary"
              >
                <Filter size={16} /> Filter
              </button>
              
              <div className="flex items-center gap-3">
                 <button onClick={() => setViewMode("list")} className={viewMode === "list" ? "text-primary" : "text-muted-foreground"} aria-label="List view">
                    <List size={20} />
                 </button>
                 <button onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "text-primary" : "text-muted-foreground"} aria-label="Grid view">
                    <LayoutGrid size={18} />
                 </button>
              </div>

              <button 
                onClick={() => setShowMobileSort(true)}
                className="flex items-center gap-1 text-sm font-medium text-primary"
              >
                Sort <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* MOBILE FILTER BOTTOM SHEET */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-[100] flex flex-col justify-end">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setShowMobileFilters(false)}></div>
              
              <div className="relative bg-[#0A3C2F] text-white flex flex-col rounded-t-[2rem] max-h-[85vh] animate-in slide-in-from-bottom-full duration-300 shadow-2xl border-t border-[#D4AF37]/30">
                <div className="flex items-center justify-between p-5 border-b border-emerald-800/60">
                  <h2 className="text-lg font-bold text-[#D4AF37] uppercase tracking-widest">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <div className="overflow-y-auto p-5 space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">Category</h3>
                    <ul className="space-y-4">
                      {categoryCounts.map((c) => (
                        <li key={c.name}>
                          <label className="flex items-center justify-between text-emerald-100 hover:text-white transition-colors cursor-pointer text-lg">
                            <span className="flex items-center gap-3">
                              <input type="checkbox" className="accent-[#D4AF37] w-5 h-5 rounded-sm cursor-pointer" checked={cats.includes(c.name)} onChange={() => toggle(cats, setCats, c.name)} />
                              <span>{c.name}</span>
                            </span>
                            <span className="text-sm opacity-60">({c.count})</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-emerald-800/60">
                    <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">Concern</h3>
                    <ul className="space-y-4">
                      {CONCERNS.map((c) => (
                        <li key={c}>
                          <label className="flex items-center gap-3 text-emerald-100 hover:text-white transition-colors cursor-pointer text-lg">
                            <input type="checkbox" className="accent-[#D4AF37] w-5 h-5 rounded-sm cursor-pointer" checked={concerns.includes(c)} onChange={() => toggle(concerns, setConcerns, c)} />
                            <span>{c}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-5 border-t border-emerald-800/60 bg-[#072c22]">
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full bg-[#D4AF37] text-[#0A3C2F] font-bold text-lg py-4 rounded-xl hover:bg-[#b5952f] transition-colors"
                  >
                    Show Results
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MOBILE SORT BOTTOM SHEET */}
          {showMobileSort && (
            <div className="fixed inset-0 z-[100] flex flex-col justify-end">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setShowMobileSort(false)}></div>
              
              <div className="relative bg-[#0A3C2F] text-white flex flex-col rounded-t-[2rem] animate-in slide-in-from-bottom-full duration-300 shadow-2xl border-t border-[#D4AF37]/30 pb-4">
                <div className="flex items-center justify-between p-5 border-b border-emerald-800/60">
                  <h2 className="text-lg font-bold text-[#D4AF37] uppercase tracking-widest">Sort By</h2>
                  <button onClick={() => setShowMobileSort(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex flex-col gap-2">
                    {[
                      { val: 'featured', label: 'Featured' },
                      { val: 'low', label: 'Price: Low to High' },
                      { val: 'high', label: 'Price: High to Low' },
                      { val: 'rating', label: 'Top Rated' }
                    ].map(opt => (
                      <button 
                        key={opt.val} 
                        onClick={() => { setSort(opt.val); setShowMobileSort(false); }}
                        className={`text-left px-5 py-4 rounded-xl text-lg font-medium transition-colors ${sort === opt.val ? 'bg-white/15 text-[#D4AF37]' : 'text-emerald-100 hover:bg-white/10'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-end gap-4 mb-8 mt-2">
            <div className="flex items-center gap-4">
              <div className="relative w-[300px] group">
                <Search size={18} strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-[#D4AF37] transition-colors" />
                <input
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-primary/15 shadow-sm text-sm text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all hover:border-primary/30"
                  placeholder="Search collections..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                />
              </div>
              <div className="relative group">
                <select
                  className="appearance-none w-52 pl-5 pr-10 py-2.5 rounded-full bg-white border border-primary/15 shadow-sm text-sm font-medium text-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all hover:border-primary/30"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown size={16} strokeWidth={2} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-primary mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
              <button
                onClick={() => {
                  setCats([]);
                  setConcerns([]);
                  setQuery("");
                  setMaxPrice(5000);
                  setAppliedPrice(5000);
                }}
                className="btn-primary mt-6 px-6 py-2"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6" : "grid grid-cols-1 gap-6"}>
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {pages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                aria-label="Previous page"
                onClick={() => setPage(Math.max(1, current - 1))}
                className="grid h-8 w-8 place-items-center rounded-full border border-border text-primary"
              >
                <ChevronLeft size={15} strokeWidth={1.5} />
              </button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`h-8 w-8 rounded-full text-sm transition-colors ${
                    n === current
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-primary hover:bg-mint"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                aria-label="Next page"
                onClick={() => setPage(Math.min(pages, current + 1))}
                className="grid h-8 w-8 place-items-center rounded-full border border-border text-primary"
              >
                <ChevronRight size={15} strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
