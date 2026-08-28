type Variant = "bestseller" | "new" | "discount" | "stock" | "delivered" | "shipped" | "processing" | "cancelled";

const styles: Record<Variant, string> = {
  bestseller: "bg-gold text-background",
  new: "bg-primary text-primary-foreground",
  discount: "bg-mint text-primary",
  stock: "bg-mint text-primary border border-primary/25",
  delivered: "bg-mint text-primary",
  shipped: "bg-info/15 text-info",
  processing: "bg-gold/20 text-gold-foreground",
  cancelled: "bg-destructive/12 text-destructive",
};

export function Badge({ variant, children }: { variant: Variant; children: React.ReactNode }) {
  return <span className={`pill ${styles[variant]}`}>{children}</span>;
}

export function StatusBadge({ status }: { status: string }) {
  return <Badge variant={status.toLowerCase() as Variant}>{status}</Badge>;
}
