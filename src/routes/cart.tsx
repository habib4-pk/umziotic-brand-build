import { createFileRoute, Link } from '@tanstack/react-router';
import { useShop } from '@/context/shop';
import { QuantitySelector } from '@/components/site/QuantitySelector';
import { formatPKR } from '@/lib/products';
import { ShoppingBag, X } from 'lucide-react';

export const Route = createFileRoute('/cart')({
  component: CartPage,
});

function CartPage() {
  const { cart, removeFromCart, setQty, subtotal, cartCount } = useShop();

  const FREE_SHIPPING_THRESHOLD = 3000;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (cartCount === 0) {
    return (
      <div className="section-x py-24 flex flex-col items-center justify-center text-center">
        <ShoppingBag className="size-16 text-muted-foreground/30 mb-6" strokeWidth={1.5} />
        <h1 className="font-display text-2xl mb-2 text-primary">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn-primary inline-flex">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="section-x py-12 md:py-20">
      <h1 className="font-display text-3xl text-primary mb-8">Your Cart</h1>
      
      {/* Free Shipping Progress */}
      <div className="mb-10 bg-white p-6 rounded-2xl shadow-soft">
        <p className="text-sm font-medium text-primary mb-3">
          {amountToFreeShipping > 0 
            ? `You're ${formatPKR(amountToFreeShipping)} away from free shipping!` 
            : "You've unlocked free shipping! 🎉"}
        </p>
        <div className="h-2 w-full bg-base-tint rounded-full overflow-hidden">
          <div 
            className="h-full bg-gold transition-all duration-500 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr_auto] gap-4 mb-4 pb-4 border-b border-base-tint text-sm font-medium text-primary uppercase tracking-wider">
        <div>Product</div>
        <div className="text-right">Price</div>
        <div className="text-center">Quantity</div>
        <div className="text-right">Subtotal</div>
        <div></div>
      </div>

      <div className="space-y-6 md:space-y-0 md:divide-y divide-base-tint mb-8">
        {cart.map((item) => (
          <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr_auto] gap-4 md:items-center py-4 bg-white md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none shadow-soft md:shadow-none relative">
            {/* Mobile Card Layout */}
            <div className="flex gap-4">
              <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover bg-base-alt" />
              <div className="flex-1 pr-8">
                <Link to="/product/$id" params={{ id: item.product.id }} className="font-display text-lg text-primary hover:text-gold transition-colors block">
                  {item.product.name}
                </Link>
                <div className="md:hidden mt-1 text-sm text-muted-foreground">{formatPKR(item.product.price)}</div>
              </div>
            </div>

            <div className="hidden md:block text-right text-primary font-medium">
              {formatPKR(item.product.price)}
            </div>

            <div className="flex items-center justify-between md:justify-center mt-4 md:mt-0">
              <span className="md:hidden text-sm font-medium text-primary">Quantity:</span>
              <QuantitySelector 
                value={item.qty} 
                onChange={(q) => setQty(item.product.id, q)} 
              />
            </div>

            <div className="flex items-center justify-between md:justify-end mt-2 md:mt-0">
              <span className="md:hidden text-sm font-medium text-primary">Subtotal:</span>
              <div className="text-right font-medium text-primary">
                {formatPKR(item.product.price * item.qty)}
              </div>
            </div>

            <div className="absolute top-4 right-4 md:static md:flex md:justify-end">
              <button 
                onClick={() => removeFromCart(item.product.id)}
                className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors rounded-full"
                aria-label="Remove item"
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-base-tint">
        <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors order-2 sm:order-1">
          Continue Shopping
        </Link>
        <div className="flex items-center gap-6 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-lg font-semibold text-primary text-right">
            <span className="text-sm font-normal text-muted-foreground mr-2">Subtotal:</span>
            {formatPKR(subtotal)}
          </div>
          <Link to="/checkout" className="btn-primary">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
