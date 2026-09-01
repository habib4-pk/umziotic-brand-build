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
import { Reveal } from "@/components/site/Reveal";
import { HeroCarousel } from "@/components/site/HeroCarousel";
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
    quote: "Umziotic has truly improved my energy and skin. I feel the difference naturally, without any side effects.",
    name: "Ayesha Khan",
    location: "Lahore, Pakistan",
    initials: "AK"
  },
  {
    quote: "The hair growth formula stopped my hair fall within two months. The quality of these herbs is unmatched.",
    name: "Fatima Rizvi",
    location: "Karachi, Pakistan",
    initials: "FR"
  },
  {
    quote: "Clean labels, honest sourcing and results I can actually see. This is my daily wellness ritual now.",
    name: "Bilal Ahmed",
    location: "Islamabad, Pakistan",
    initials: "BA"
  },
  {
    quote: "I've tried many supplements, but the U3 Weight Gain gave me exactly the boost I needed without feeling bloated.",
    name: "Zainab Ali",
    location: "Multan, Pakistan",
    initials: "ZA"
  },
  {
    quote: "Their detox tea is incredible. It tastes earthy and fresh, and I feel so much lighter every morning.",
    name: "Omar Farooq",
    location: "Peshawar, Pakistan",
    initials: "OF"
  }
];

function Home() {
  const [t, setT] = useState(0);
  const bestsellers = products.slice(0, 4);
  const active = testimonials[t] ?? testimonials[0]!;

  return (
    <>
      <HeroCarousel intervalMs={15000} />

      <Reveal delay={100}>
        <section className="border-y border-border bg-background">
          <div className="section-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-3 lg:grid-cols-5">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className={`flex items-center gap-3 ${label === "Made with Care" ? "hidden sm:flex" : ""}`}>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-gold">
                <Icon size={18} strokeWidth={1.25} />
              </span>
              <span className="text-xs leading-snug text-muted-foreground">{label}</span>
            </div>
          ))}
          </div>
        </section>
      </Reveal>

      <section className="overflow-hidden border-b border-border bg-mint/20 py-4">
        <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap px-4 font-display text-sm uppercase tracking-widest text-primary">
          {Array(8).fill("✦ 100% Organic ✦ Clinically Proven ✦ No Artificial Additives ✦ Made in Pakistan").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </section>

      <Reveal delay={150}>
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
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
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
      </Reveal>

      <Reveal delay={100}>
        <section className="py-16 text-center bg-[#F5F0E1]">
          <h2 className="text-2xl text-primary sm:text-3xl font-bold tracking-tight">What Our Customers Say</h2>
          
          <div className="relative mt-12 w-full overflow-hidden group">
            <div className="flex w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
              {/* Double the list to create a seamless infinite scroll effect */}
              {[...testimonials, ...testimonials].map((active, idx) => (
                <div key={idx} className="w-[300px] sm:w-[400px] shrink-0 mx-3 rounded-2xl bg-white border border-primary/10 shadow-sm px-6 py-8 text-left flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="font-medium text-primary/80 mb-6 flex-1 text-sm sm:text-base leading-relaxed">
                    "{active.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-primary/5">
                    <div className="w-11 h-11 shrink-0 rounded-full border-2 border-[#D4AF37]/30 shadow-sm bg-primary text-[#D4AF37] flex items-center justify-center font-bold text-lg tracking-wide">
                      {active.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">{active.name}</p>
                      <p className="text-xs text-muted-foreground">{active.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={50}>
        <section className="py-8 px-4 sm:px-6 md:px-8">
          <div className="grid items-center gap-8 rounded-3xl bg-primary py-8 px-6 md:py-10 md:px-12 lg:grid-cols-2 shadow-lg">
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
      </Reveal>
    </>
  );
}
