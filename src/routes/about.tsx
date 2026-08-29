import { createFileRoute, Link } from '@tanstack/react-router';
import { Heart, Leaf, ShieldCheck } from 'lucide-react';
import storyHerbs from '@/assets/story-herbs.jpg';
import heroBottle from '@/assets/hero-bottle.jpg';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="bg-base-alt py-16 lg:py-24">
        <div className="section-x grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold font-medium uppercase tracking-wider text-sm mb-4 block">
              Our Story
            </span>
            <h1 className="font-display text-3xl lg:text-4xl text-primary mb-6">
              Rooted in Nature, Driven by Purpose
            </h1>
            <div className="text-muted-foreground leading-relaxed space-y-4 mb-8">
              <p>
                Umziotic was born from a simple belief — that nature holds the key to true wellness. Founded in Lahore, Pakistan, we set out to bridge the gap between traditional herbal wisdom and modern scientific research.
              </p>
              <p>
                Every product we create is the result of months of research, sourcing the finest botanicals from trusted growers, and formulating blends that are both effective and pure. We never compromise on quality, and every batch is third-party tested for potency and safety.
              </p>
              <p>
                Our mission is to empower you to take charge of your health with supplements you can trust — transparent, natural, and backed by science.
              </p>
            </div>
            <button className="btn-gold">Learn More</button>
          </div>
          <div>
            <img 
              src={storyHerbs} 
              alt="Herbs and botanicals" 
              className="w-full h-auto rounded-2xl shadow-lift object-cover aspect-[4/3] lg:aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Image Gallery Row */}
      <section className="py-16 section-x">
        <div className="grid grid-cols-3 gap-4 lg:gap-6">
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img src={storyHerbs} alt="Herbs" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img src={heroBottle} alt="Product" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img src={storyHerbs} alt="Botanicals" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
          </div>
        </div>
      </section>

      {/* Mission / Values / Promise */}
      <section className="bg-base-alt py-16">
        <h2 className="font-display text-2xl text-center text-primary mb-10">What We Stand For</h2>
        <div className="md:grid-cols-3 gap-8 section-x grid">
          {/* Card 1 */}
          <div className="bg-card rounded-2xl p-8 text-center shadow-soft">
            <div className="bg-mint w-14 h-14 rounded-full grid place-items-center mx-auto text-primary">
              <Heart strokeWidth={1.5} size={28} />
            </div>
            <h3 className="font-display text-lg text-primary mt-4">Our Mission</h3>
            <p className="text-sm text-muted-foreground mt-2">
              To make premium herbal wellness accessible to everyone, combining nature's wisdom with scientific innovation.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-card rounded-2xl p-8 text-center shadow-soft">
            <div className="bg-mint w-14 h-14 rounded-full grid place-items-center mx-auto text-primary">
              <Leaf strokeWidth={1.5} size={28} />
            </div>
            <h3 className="font-display text-lg text-primary mt-4">Our Values</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Transparency, purity, and sustainability guide everything we do — from sourcing to packaging.
            </p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-card rounded-2xl p-8 text-center shadow-soft">
            <div className="bg-mint w-14 h-14 rounded-full grid place-items-center mx-auto text-primary">
              <ShieldCheck strokeWidth={1.5} size={28} />
            </div>
            <h3 className="font-display text-lg text-primary mt-4">Our Promise</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Every product is third-party tested, free from artificial additives, and crafted with care in small batches.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-x py-16">
        <div className="w-full rounded-2xl bg-primary p-10 lg:p-14 text-center shadow-lift">
          <h2 className="font-display text-2xl text-primary-foreground">
            Ready to Transform Yourself Naturally?
          </h2>
          <p className="text-primary-foreground/70 mt-2 max-w-lg mx-auto">
            Browse our collection of premium herbal supplements.
          </p>
          <Link to="/shop" className="btn-gold mt-6 inline-block">
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}
