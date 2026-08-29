import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useShop } from '@/context/shop';
import { formatPKR } from '@/lib/products';
import { Check, CheckCircle, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartCount, subtotal, placeOrder } = useShop();
  
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState('');
  
  const [shippingData, setShippingData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    saveAddress: false
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  const FREE_SHIPPING_THRESHOLD = 3000;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 250;
  const total = subtotal + shippingCost;

  useEffect(() => {
    if (cartCount === 0 && step !== 3) {
      navigate({ to: '/cart' });
    }
  }, [cartCount, step, navigate]);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingData.fullName || !shippingData.phone || !shippingData.address || !shippingData.city) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    const fullAddress = `${shippingData.address}, ${shippingData.city}${shippingData.state ? ', ' + shippingData.state : ''}, Pakistan`;
    const order = placeOrder(fullAddress);
    setOrderId(order.id);
    setStep(3);
    window.scrollTo(0, 0);
    toast.success('Order placed successfully!');
  };

  if (step === 3) {
    return (
      <div className="section-x py-24 flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
          <CheckCircle className="size-12" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-primary mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground text-lg mb-2">
          Your order <span className="font-medium text-primary">#{orderId}</span> has been placed.
        </p>
        <p className="text-muted-foreground mb-10">
          We will send you a confirmation email shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/orders" className="btn-primary px-8">
            View My Orders
          </Link>
          <Link to="/shop" className="btn-outline px-8">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-x py-10 md:py-16">
      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-5 -translate-y-1/2 w-full h-[2px] bg-base-tint -z-10" />
          <div 
            className="absolute left-0 top-5 -translate-y-1/2 h-[2px] bg-primary -z-10 transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
          
          {[
            { num: 1, label: 'Shipping' },
            { num: 2, label: 'Payment' },
            { num: 3, label: 'Confirmation' }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2 bg-base px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                ${step > s.num ? 'bg-primary text-white' : step === s.num ? 'bg-primary text-white' : 'bg-base-tint text-muted-foreground'}`}>
                {step > s.num ? <Check className="size-5" strokeWidth={2} /> : s.num}
              </div>
              <span className={`text-xs md:text-sm font-medium ${step >= s.num ? 'text-primary' : 'text-muted-foreground'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
        {/* Left Column */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft">
          {step === 1 ? (
            <form id="shipping-form" onSubmit={handleShippingSubmit} className="space-y-6">
              <h2 className="font-display text-2xl text-primary mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">Full Name *</label>
                  <input type="text" className="field" value={shippingData.fullName} onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">Phone Number *</label>
                  <input type="tel" className="field" value={shippingData.phone} onChange={(e) => setShippingData({...shippingData, phone: e.target.value})} required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Email Address</label>
                <input type="email" className="field" value={shippingData.email} onChange={(e) => setShippingData({...shippingData, email: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Address *</label>
                <input type="text" className="field" value={shippingData.address} onChange={(e) => setShippingData({...shippingData, address: e.target.value})} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">City *</label>
                  <input type="text" className="field" value={shippingData.city} onChange={(e) => setShippingData({...shippingData, city: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">State/Province</label>
                  <input type="text" className="field" value={shippingData.state} onChange={(e) => setShippingData({...shippingData, state: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Postal Code</label>
                <input type="text" className="field sm:max-w-xs" value={shippingData.postalCode} onChange={(e) => setShippingData({...shippingData, postalCode: e.target.value})} />
              </div>

              <label className="flex items-center gap-3 mt-4 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded text-primary focus:ring-primary border-base-tint" checked={shippingData.saveAddress} onChange={(e) => setShippingData({...shippingData, saveAddress: e.target.checked})} />
                <span className="text-sm font-medium text-primary">Save this address for later</span>
              </label>

              <div className="pt-4 lg:hidden">
                <button type="submit" className="btn-primary w-full">Continue to Payment</button>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl text-primary">Payment Method</h2>
                <button onClick={() => setStep(1)} className="text-sm font-medium text-muted-foreground hover:text-primary underline">Edit Shipping</button>
              </div>

              <div className="space-y-4">
                <label className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-base-tint bg-white hover:border-primary/30'}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="sr-only" />
                  <Banknote className={`size-6 mr-4 flex-shrink-0 ${paymentMethod === 'cod' ? 'text-primary' : 'text-muted-foreground'}`} strokeWidth={1.5} />
                  <span className={`font-medium ${paymentMethod === 'cod' ? 'text-primary' : 'text-primary/80'}`}>Cash on Delivery</span>
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'cod' ? 'border-primary' : 'border-base-tint'}`}>
                    {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                  </div>
                </label>

                <label className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-colors ${paymentMethod === 'jazzcash' ? 'border-primary bg-primary/5' : 'border-base-tint bg-white hover:border-primary/30'}`}>
                  <input type="radio" name="payment" value="jazzcash" checked={paymentMethod === 'jazzcash'} onChange={() => setPaymentMethod('jazzcash')} className="sr-only" />
                  <Smartphone className={`size-6 mr-4 flex-shrink-0 ${paymentMethod === 'jazzcash' ? 'text-primary' : 'text-muted-foreground'}`} strokeWidth={1.5} />
                  <span className={`font-medium ${paymentMethod === 'jazzcash' ? 'text-primary' : 'text-primary/80'}`}>JazzCash</span>
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'jazzcash' ? 'border-primary' : 'border-base-tint'}`}>
                    {paymentMethod === 'jazzcash' && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                  </div>
                </label>

                <label className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-colors ${paymentMethod === 'easypaisa' ? 'border-primary bg-primary/5' : 'border-base-tint bg-white hover:border-primary/30'}`}>
                  <input type="radio" name="payment" value="easypaisa" checked={paymentMethod === 'easypaisa'} onChange={() => setPaymentMethod('easypaisa')} className="sr-only" />
                  <Smartphone className={`size-6 mr-4 flex-shrink-0 ${paymentMethod === 'easypaisa' ? 'text-primary' : 'text-muted-foreground'}`} strokeWidth={1.5} />
                  <span className={`font-medium ${paymentMethod === 'easypaisa' ? 'text-primary' : 'text-primary/80'}`}>Easypaisa</span>
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'easypaisa' ? 'border-primary' : 'border-base-tint'}`}>
                    {paymentMethod === 'easypaisa' && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                  </div>
                </label>

                <label className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-base-tint bg-white hover:border-primary/30'}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="sr-only" />
                  <CreditCard className={`size-6 mr-4 flex-shrink-0 ${paymentMethod === 'card' ? 'text-primary' : 'text-muted-foreground'}`} strokeWidth={1.5} />
                  <div>
                    <div className={`font-medium ${paymentMethod === 'card' ? 'text-primary' : 'text-primary/80'}`}>Credit/Debit Card</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Visa, Mastercard</div>
                  </div>
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'card' ? 'border-primary' : 'border-base-tint'}`}>
                    {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                  </div>
                </label>
              </div>

              <div className="pt-8 lg:hidden">
                <button onClick={handlePlaceOrder} className="btn-primary w-full">Place Order</button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar (Order Summary) */}
        <div className="bg-white p-6 rounded-2xl shadow-soft sticky top-24">
          <h3 className="font-display text-xl text-primary mb-6">Order Summary</h3>
          
          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover rounded-lg bg-base-alt" />
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                    {item.qty}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate" title={item.product.name}>{item.product.name}</p>
                </div>
                <div className="text-sm font-medium text-primary text-right whitespace-nowrap">
                  {formatPKR(item.product.price * item.qty)}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-base-tint">
            <div className="flex justify-between text-sm text-primary">
              <span>Subtotal</span>
              <span className="font-medium">{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-primary">
              <span>Shipping</span>
              <span className="font-medium">{shippingCost === 0 ? 'Free' : formatPKR(shippingCost)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-primary pt-4 border-t border-base-tint">
              <span>Total</span>
              <span>{formatPKR(total)}</span>
            </div>
          </div>

          <div className="hidden lg:block mt-8">
            {step === 1 ? (
              <button 
                onClick={() => {
                  const form = document.getElementById('shipping-form') as HTMLFormElement;
                  if (form) form.requestSubmit();
                }} 
                className="btn-primary w-full py-3"
              >
                Continue to Payment
              </button>
            ) : (
              <button onClick={handlePlaceOrder} className="btn-primary w-full py-3">
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
