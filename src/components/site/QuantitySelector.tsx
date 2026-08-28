import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="grid h-7 w-7 place-items-center rounded-full text-primary transition-colors hover:bg-mint"
      >
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <span className="min-w-7 text-center text-sm">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className="grid h-7 w-7 place-items-center rounded-full text-primary transition-colors hover:bg-mint"
      >
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}
