import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import storyHerbs from "@/assets/story-herbs.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Herbal Wellness Journal — Umziotic" },
      {
        name: "description",
        content:
          "Guides, ingredient deep-dives and wellness rituals from the Umziotic herbal research team.",
      },
      { property: "og:title", content: "Herbal Wellness Journal — Umziotic" },
      {
        property: "og:description",
        content: "Ingredient deep-dives and everyday wellness rituals from Umziotic.",
      },
    ],
  }),
  component: Blog,
});

const posts = [
  {
    title: "5 Herbs That Genuinely Slow Hair Fall",
    date: "May 18, 2026",
    excerpt:
      "From bhringraj to saw palmetto, here is what the research actually says about botanical hair support.",
  },
  {
    title: "Building a Morning Ritual for Steady Energy",
    date: "May 04, 2026",
    excerpt:
      "Adaptogens work best with rhythm. A simple routine to keep your energy level through the day.",
  },
  {
    title: "How We Test Every Batch for Purity",
    date: "April 21, 2026",
    excerpt:
      "A look inside our third-party lab process — heavy metals, potency assays and microbial screening.",
  },
  {
    title: "Gut Health Is Skin Health",
    date: "April 09, 2026",
    excerpt: "Why clearing breakouts often starts with digestion, and the herbs that help most.",
  },
];

function Blog() {
  return (
    <div className="section-x py-10">
      <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Blog" }]} />
      <h1 className="mt-3 text-3xl text-primary">Journal</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Herbal knowledge, ingredient stories and wellness rituals.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {posts.map((p) => (
          <article key={p.title} className="overflow-hidden rounded-2xl bg-card shadow-soft">
            <img
              src={storyHerbs}
              alt=""
              loading="lazy"
              width={1024}
              height={768}
              className="h-44 w-full object-cover"
            />
            <div className="p-6">
              <p className="text-xs text-muted-foreground">{p.date}</p>
              <h2 className="mt-2 font-display text-lg text-primary">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              <button className="btn-outline mt-5 px-5 py-1.5 text-xs">Read Article</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
