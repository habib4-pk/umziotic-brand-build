import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Beaker,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  ShieldCheck,
  Sprout,
  Star,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/products";
import heroBottle from "@/assets/hero-bottle.jpg";
import storyHerbs from "@/assets/story-herbs.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Umziotic — Transform Yourself Naturally" },
      {
        name: "description",
        content:
          "Premium herbal supplements crafted from nature. Shop bestselling hair, skin, immunity and detox formulas from Umziotic.",
      },
      { property: "og:title", content: "Umziotic — Transform Yourself Naturally" },
      {
        property: "og:description",
        content: "Premium herbal supplements crafted from nature for a healthier, happier you.",
      },
    ],
  }),
  component: Home,
});

const trust = [
  { icon: Leaf, label: "100% Natural Ingredients" },
  { icon: Beaker, label: "Lab Tested For Purity" },
  { icon: ShieldCheck, label: "Clinically Researched" },
  { icon: Sprout, label: "No Artificial Additives" },
  { icon: Heart, label: "Made with Care" },
];

const testimonials = [
  {
    quote:
      "Umziotic has truly improved my energy and skin. I feel the difference naturally, without any side effects.",
    name: "Ayesha Khan",
    location: "Lahore, Pakistan",
  },
  {
    quote:
      "The hair growth formula stopped my hair fall within two months. The quality of these herbs is unmatched.",
    name: "Fatima Rizvi",
    location: "Karachi, Pakistan",
  },
  {
    quote:
      "Clean labels, honest sourcing and results I can actually see. This is my daily wellness ritual now.",
    name: "Bilal Ahmed",
    location: "Islamabad, Pakistan",
  },
];

function Home() {
  const [t, setT] = useState(0);
  const bestsellers = products.slice(0, 4);
  const active = testimonials[t];

  return (
    <>
      <section className="bg-base-alt">
        <div className="section-x grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <h1 className="font-display text-4xl leading-[1.1] text-primary sm:text-5xl lg:text-6xl">
              Transform
              <br />
              Yourself
              <br />
              Naturally
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Premium herbal supplements crafted from nature for a healthier, happier you — blended
              with 15+ botanicals and tested for purity in every batch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary">
                Shop Now <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <Link to="/about" className="btn-outline">
                Explore Our Story
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroBottle}
              alt="Umziotic herbal hair growth support formula bottle with botanicals"
              width={1024}
              height={1024}
              className="w-full rounded-3xl object-cover shadow-lift"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background">
        <div className="section-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-3 lg:grid-cols-5">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-gold">
                <Icon size={18} strokeWidth={1.25} />
              </span>
              <span className="text-xs leading-snug text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-x py-16">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <h2 className="text-2xl text-primary sm:text-3xl">Bestsellers</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Loved by thousands of happy customers
            </p>
          </div>
          <Link to="/shop" className="shrink-0 text-sm text-primary underline underline-offset-4">
            View All
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-base-alt">
        <div className="section-x grid items-center gap-12 py-16 lg:grid-cols-2">
          <div>
            <h2 className="max-w-sm text-2xl leading-snug text-primary sm:text-3xl">
              Rooted in Nature, Backed by Science
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              At Umziotic, we blend ancient herbal wisdom with modern science to bring you clean,
              effective and trustworthy supplements. Every batch is third-party tested and made in
              small runs to protect potency.
            </p>
            <Link to="/about" className="btn-outline mt-8">
              Discover Our Story
            </Link>
          </div>
          <img
            src={storyHerbs}
            alt="Mortar and pestle with fresh herbs"
            loading="lazy"
            width={1024}
            height={768}
            className="w-full rounded-3xl object-cover shadow-soft"
          />
        </div>
      </section>

      <section className="section-x py-16 text-center">
        <h2 className="text-2xl text-primary sm:text-3xl">What Our Customers Say</h2>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            aria-label="Previous testimonial"
            onClick={() => setT((t - 1 + testimonials.length) % testimonials.length)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-primary transition-colors hover:bg-mint"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <div className="max-w-xl flex-1 rounded-2xl bg-base-alt px-6 py-10">
            <div className="flex justify-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} className="fill-gold text-gold" strokeWidth={1.5} />
              ))}
            </div>
            <p className="mt-5 font-display text-lg leading-relaxed text-primary">
              “{active.quote}”
            </p>
            <p className="mt-6 text-sm font-medium text-primary">{active.name}</p>
            <p className="text-xs text-muted-foreground">{active.location}</p>
          </div>
          <button
            aria-label="Next testimonial"
            onClick={() => setT((t + 1) % testimonials.length)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-primary transition-colors hover:bg-mint"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </section>

      <section className="bg-primary">
        <div className="section-x grid items-center gap-8 py-14 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl text-primary-foreground sm:text-3xl">Stay in the Loop</h2>
            <p className="mt-2 text-sm text-primary-foreground/70">
              Get exclusive offers, health tips and updates.
            </p>
          </div>
          <form
            className="flex gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("You're subscribed!", { description: "Welcome to the Umziotic list." });
              (e.target as HTMLFormElement).reset();
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="field"
            />
            <button type="submit" className="btn-gold shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
