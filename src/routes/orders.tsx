import { createFileRoute, Link } from "@tanstack/react-router";
import { useShop } from "@/context/shop";
import { StatusBadge } from "@/components/site/Badge";
import { formatPKR } from "@/lib/products";
import { Package, ChevronDown, ChevronUp, MapPin, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
});

function OrdersPage() {
  const { orders } = useShop();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const statusSteps = ["Processing", "Shipped", "Delivered"];

  return (
    <div className="section-x py-12 min-h-[calc(100vh-200px)]">
      <h1 className="font-display text-3xl text-primary mb-8">My Orders</h1>

      {(!orders || orders.length === 0) ? (
        <div className="bg-card rounded-2xl shadow-soft p-12 flex flex-col items-center justify-center text-center">
          <Package className="w-16 h-16 text-muted-foreground/30 mb-4" strokeWidth={1.5} />
          <h2 className="font-display text-2xl text-primary mb-2">
            No orders yet
          </h2>
          <p className="text-muted-foreground mb-6">
            Start shopping to see your orders here.
          </p>
          <Link to="/shop" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-5 gap-4 p-4 bg-base-alt text-sm font-medium text-muted-foreground">
            <div>Order #</div>
            <div>Date</div>
            <div>Status</div>
            <div>Total</div>
            <div>Action</div>
          </div>

          <div className="divide-y divide-border">
            {orders.map((order) => {
              const isExpanded = expandedId === order.id;
              
              const currentStatusIndex = statusSteps.indexOf(order.status) >= 0 
                ? statusSteps.indexOf(order.status) 
                : order.status === "Cancelled" ? -1 : 0;

              return (
                <div key={order.id} className="flex flex-col">
                  {/* Order Row */}
                  <div className="p-4 md:grid md:grid-cols-5 md:gap-4 md:items-center flex flex-col gap-3">
                    <div className="flex justify-between md:block">
                      <span className="md:hidden text-sm text-muted-foreground">Order #</span>
                      <span className="font-medium text-primary">
                        {order.id}
                      </span>
                    </div>
                    <div className="flex justify-between md:block">
                      <span className="md:hidden text-sm text-muted-foreground">Date</span>
                      <span className="text-muted-foreground">
                        {order.date}
                      </span>
                    </div>
                    <div className="flex justify-between md:block items-center">
                      <span className="md:hidden text-sm text-muted-foreground">Status</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="flex justify-between md:block">
                      <span className="md:hidden text-sm text-muted-foreground">Total</span>
                      <span className="font-medium text-primary">
                        {formatPKR(order.total)}
                      </span>
                    </div>
                    <div className="flex justify-end md:justify-start">
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="text-gold font-medium hover:underline flex items-center gap-1 text-sm"
                      >
                        {isExpanded ? "Hide Details" : "View Details"}
                        {isExpanded ? (
                          <ChevronUp size={16} strokeWidth={1.5} />
                        ) : (
                          <ChevronDown size={16} strokeWidth={1.5} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded View */}
                  {isExpanded && (
                    <div className="p-6 bg-base/50 border-t border-border border-dashed">
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Order Items */}
                        <div>
                          <h4 className="font-medium text-primary mb-4">Order Items</h4>
                          <ul className="space-y-3">
                            {order.items.map((item, idx) => (
                              <li key={idx} className="flex justify-between text-sm">
                                <div>
                                  <p className="font-medium text-primary">{item.name}</p>
                                  <p className="text-muted-foreground">Qty: {item.qty} × {formatPKR(item.price)}</p>
                                </div>
                                <span className="font-medium text-primary">
                                  {formatPKR(item.price * item.qty)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Shipping & Status */}
                        <div>
                          <h4 className="font-medium text-primary mb-4">Shipping Details</h4>
                          <div className="flex items-start gap-2 text-sm text-muted-foreground mb-8">
                            <MapPin size={16} className="mt-0.5 text-primary shrink-0" strokeWidth={1.5} />
                            <p className="leading-relaxed">{order.address}</p>
                          </div>

                          <h4 className="font-medium text-primary mb-4">Order Status</h4>
                          {order.status === "Cancelled" ? (
                            <p className="text-sm text-destructive font-medium">Order Cancelled</p>
                          ) : (
                            <div className="relative">
                              <div className="absolute left-[15px] top-0 bottom-6 w-0.5 bg-border -z-10" />
                              <ul className="space-y-6">
                                {["Order Placed", "Processing", "Shipped", "Delivered"].map((stepLabel, idx) => {
                                  const isCompleted = idx <= (currentStatusIndex >= 0 ? currentStatusIndex + 1 : 0);
                                  const isCurrent = idx === (currentStatusIndex >= 0 ? currentStatusIndex + 1 : 0);
                                  
                                  return (
                                    <li key={stepLabel} className="flex items-center gap-4">
                                      <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                                          isCompleted
                                            ? "bg-primary border-primary text-white"
                                            : "bg-card border-border text-muted-foreground"
                                        }`}
                                      >
                                        {isCompleted && !isCurrent ? (
                                          <Check size={14} strokeWidth={2} />
                                        ) : (
                                          <div className={`w-2.5 h-2.5 rounded-full ${isCurrent ? 'bg-white' : 'bg-transparent'}`} />
                                        )}
                                      </div>
                                      <span className={`text-sm font-medium ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {stepLabel}
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-border flex justify-end">
                         <button 
                           onClick={() => toggleExpand(order.id)}
                           className="btn-outline text-sm py-2 px-4"
                         >
                           Close Details
                         </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
