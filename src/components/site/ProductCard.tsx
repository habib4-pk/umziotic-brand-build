import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "./Badge";
import { Stars } from "./Stars";
import { useShop } from "@/context/shop";
import { formatPKR, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const wished = wishlist.includes(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition-shadow hover:shadow-lift">
      <div className="relative">
        <Link to="/product/$id" params={{ id: product.id }} className="block">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover"
          />
        </Link>
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-card/90 text-primary shadow-soft"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={wished ? "fill-gold text-gold" : ""}
          />
        </button>
        {product.badge && (
          <span className="absolute left-3 top-3">
            <Badge variant={product.badge === "Bestseller" ? "bestseller" : "new"}>
              {product.badge}
            </Badge>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="font-display text-[0.95rem] leading-snug text-primary hover:underline"
        >
          {product.name}
        </Link>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-primary">{formatPKR(product.price)}</span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-muted-foreground line-through">
                {formatPKR(product.originalPrice)}
              </span>
              <Badge variant="discount">-{discount}%</Badge>
            </>
          )}
        </div>
        <button
          type="button"
          className="btn-primary mt-auto w-full"
          onClick={() => {
            addToCart(product);
            toast.success("Added to cart", { description: product.name });
          }}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
