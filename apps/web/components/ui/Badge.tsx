type BadgeVariant = "green" | "amber";

const variantClasses: Record<BadgeVariant, string> = {
  green: "bg-badge-green-bg text-badge-green-text",
  amber: "bg-badge-amber-bg text-badge-amber-text",
};

type BadgeProps = {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
};

export function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`text-xs font-medium px-3 py-0.5 rounded-full ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
