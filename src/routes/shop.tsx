import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, CONCERNS, categoryCounts, formatPKR, products } from "@/lib/products";

export const Route = createFileRoute("/shop")({
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
  const [cats, setCats] = useState<string[]>([]);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [appliedPrice, setAppliedPrice] = useState(5000);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

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
    <div className="section-x py-10">
      <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Shop" }]} />
      <h1 className="mt-3 text-3xl text-primary">Shop</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="space-y-8">
          <div>
            <h2 className="text-base text-primary">Filters</h2>
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
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <div className="relative min-w-0">
              <Search
                size={16}
                strokeWidth={1.5}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                className="field pl-9"
                placeholder="Search products..."
                aria-label="Search products"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <select
              className="field sm:w-52"
              aria-label="Sort by"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {visible.length === 0 ? (
            <p className="mt-16 text-center text-sm text-muted-foreground">
              No products match your filters.
            </p>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}
