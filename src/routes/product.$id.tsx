import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { getProduct, products, formatPKR } from "@/lib/products";
import { useShop } from "@/context/shop";
import { Badge } from "@/components/site/Badge";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { QuantitySelector } from "@/components/site/QuantitySelector";
import { Stars } from "@/components/site/Stars";
import { ProductCard } from "@/components/site/ProductCard";
import { Heart, Leaf, FlaskConical, ShieldCheck, Truck, Package, Check, ArrowLeft, Star } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const product = getProduct(id);
  const { addToCart, wishlist, toggleWishlist } = useShop();

  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    // Reset state on id change
    setQty(1);
    setActiveTab("overview");
    setActiveThumbnail(0);
  }, [id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const sameCat = products.filter((p) => p.category === product.category && p.id !== product.id);
    if (sameCat.length >= 4) {
      return sameCat.slice(0, 4);
    }
    const other = products.filter((p) => p.id !== product.id && !sameCat.find(s => s.id === p.id));
    return [...sameCat, ...other].slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="section-x py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="font-display text-4xl text-primary mb-6">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link to="/shop" className="btn-primary flex items-center gap-2">
          <ArrowLeft size={18} strokeWidth={1.5} />
          Back to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${qty}x ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate({ to: "/cart" });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "ingredients", label: "Ingredients" },
    { id: "benefits", label: "Benefits" },
    { id: "howToUse", label: "How to Use" },
    { id: "reviews", label: `Reviews (${product.reviews})` },
  ];

  return (
    <main className="pb-24">
      {/* Breadcrumb section */}
      <div className="bg-base-alt py-6 border-b border-base-tint">
        <div className="section-x">
          <Breadcrumb trail={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: product.name }
          ]} />
        </div>
      </div>

      <div className="section-x pt-12 pb-16">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          
          {/* Left Column: Images */}
          <div className="flex flex-col-reverse sm:flex-row gap-4 h-fit">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-4 overflow-x-auto sm:overflow-x-visible shrink-0 pb-2 sm:pb-0 hide-scrollbar">
              {[0, 1, 2, 3].map((index) => (
                <button 
                  key={index} 
                  onClick={() => setActiveThumbnail(index)}
                  className={`w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeThumbnail === index ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img 
                    src={product.image} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="w-full rounded-2xl overflow-hidden shadow-soft aspect-[4/5] sm:aspect-auto sm:h-[600px] relative bg-base-alt flex items-center justify-center">
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant={product.badge.toLowerCase() as any}>{product.badge}</Badge>
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col space-y-6">
            <div>
              <p className="text-muted-foreground text-sm tracking-widest uppercase mb-2">{product.category}</p>
              <h1 className="font-display text-3xl lg:text-4xl text-primary mb-3">{product.name}</h1>
              <div className="flex items-center gap-4">
                <Stars rating={product.rating} reviews={product.reviews} />
                <span className="text-sm text-muted-foreground underline cursor-pointer" onClick={() => setActiveTab("reviews")}>
                  See all reviews
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 py-2">
              <span className="text-2xl font-semibold text-primary">{formatPKR(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through decoration-1">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
              {discountPercent > 0 && (
                <Badge variant="discount">-{discountPercent}%</Badge>
              )}
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              {product.short}
            </p>

            {/* Trust Icon Row */}
            <div className="flex flex-wrap gap-6 py-4 border-y border-base-tint">
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <Leaf size={18} strokeWidth={1.5} className="text-gold" />
                <span>100% Natural</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <FlaskConical size={18} strokeWidth={1.5} className="text-gold" />
                <span>Lab Tested</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <ShieldCheck size={18} strokeWidth={1.5} className="text-gold" />
                <span>No Side Effects</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-5 pt-2">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-primary">Quantity</span>
                <QuantitySelector value={qty} onChange={setQty} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button onClick={handleAddToCart} className="btn-primary flex-1 py-4 text-base">
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="btn-gold flex-1 py-4 text-base">
                  Buy Now
                </button>
              </div>

              <button 
                onClick={handleToggleWishlist}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mx-auto sm:mx-0 pt-2"
              >
                <Heart size={18} strokeWidth={1.5} className={isWishlisted ? "fill-primary text-primary" : ""} />
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
            
            {/* Delivery Estimator Placeholder */}
            <div className="bg-base-alt p-4 rounded-xl mt-4 border border-base-tint">
              <div className="flex items-start gap-3">
                <Truck size={20} strokeWidth={1.5} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-primary mb-1">Standard Delivery</p>
                  <p className="text-xs text-muted-foreground">Normally delivers in 3-5 business days across Pakistan.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-20">
          <div className="flex overflow-x-auto hide-scrollbar border-b border-base-tint mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-base font-medium whitespace-nowrap transition-colors relative ${
                  activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-4xl min-h-[200px]">
            {activeTab === "overview" && (
              <div className="prose prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
                <p>{product.description}</p>
                {/* Simulated extra content for visual balance */}
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Our herbal formulations are carefully crafted by combining traditional wisdom with modern scientific research to ensure maximum efficacy and safety. Every batch is rigorously tested to meet our high standards of quality.
                </p>
              </div>
            )}

            {activeTab === "ingredients" && (
              <ul className="grid sm:grid-cols-2 gap-4">
                {product.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-center gap-3 bg-base-alt p-4 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-base-tint flex items-center justify-center shrink-0">
                      <Leaf size={16} strokeWidth={1.5} className="text-primary" />
                    </div>
                    <span className="text-primary font-medium">{ingredient}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "benefits" && (
              <ul className="space-y-4">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-gold/20 text-gold rounded-full p-1 shrink-0">
                      <Check size={14} strokeWidth={2} />
                    </div>
                    <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "howToUse" && (
              <div className="bg-base-alt p-8 rounded-2xl border border-base-tint relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
                <h3 className="font-display text-xl text-primary mb-4">Directions</h3>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  {product.howToUse}
                </p>
                <div className="flex items-center gap-2 text-sm text-primary font-medium bg-white/50 w-fit px-4 py-2 rounded-full shadow-soft">
                  <FlaskConical size={16} strokeWidth={1.5} />
                  For best results, use consistently as directed.
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl text-primary">Customer Reviews</h3>
                  <button className="btn-outline px-6 py-2 text-sm">Write a Review</button>
                </div>
                
                <div className="grid gap-6">
                  {/* Fake Reviews */}
                  {[
                    { name: "Aisha K.", date: "Oct 12, 2025", text: "Absolutely love this product! It's been working wonders for me since day one. Highly recommend.", rating: 5 },
                    { name: "Usman A.", date: "Sep 28, 2025", text: "Good quality, fast shipping. I can see a difference after two weeks of use.", rating: 4 },
                    { name: "Fatima R.", date: "Aug 15, 2025", text: "The natural ingredients are what sold me, and I haven't been disappointed. Will definitely buy again.", rating: 5 },
                  ].map((review, i) => (
                    <div key={i} className="border-b border-base-tint pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-base-tint flex items-center justify-center text-primary font-display text-lg">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-primary">{review.name}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex text-gold">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={14} className={star <= review.rating ? "fill-gold" : "text-muted-foreground opacity-30"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust/Shipping Row */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <div className="flex items-center gap-4 p-6 rounded-2xl border border-base-tint bg-base hover:bg-base-alt transition-colors">
            <div className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center shrink-0">
              <Truck size={24} strokeWidth={1.5} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-primary mb-1">Free Shipping</h4>
              <p className="text-sm text-muted-foreground">On orders above PKR 3,000</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 rounded-2xl border border-base-tint bg-base hover:bg-base-alt transition-colors">
            <div className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center shrink-0">
              <Package size={24} strokeWidth={1.5} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-primary mb-1">7 Days Returns</h4>
              <p className="text-sm text-muted-foreground">Easy return process</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 rounded-2xl border border-base-tint bg-base hover:bg-base-alt transition-colors">
            <div className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center shrink-0">
              <ShieldCheck size={24} strokeWidth={1.5} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-primary mb-1">Secure Payment</h4>
              <p className="text-sm text-muted-foreground">100% secure checkout</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl text-primary">You May Also Like</h2>
              <Link to="/shop" className="text-primary hover:text-gold font-medium transition-colors hidden sm:block">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link to="/shop" className="btn-outline inline-block">
                View all products
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
