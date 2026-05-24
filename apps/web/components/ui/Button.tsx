"use client";

type ButtonVariant = "primary" | "secondary" | "accent";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-background hover:bg-primary-hover transition-colors duration-200",
  secondary:
    "border border-primary text-primary hover:bg-primary-hover hover:text-background transition-colors duration-200",
  accent:
    "bg-accent text-background hover:bg-accent-hover transition-colors duration-200",
};

type ButtonProps = {
  variant: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export function Button({
  variant,
  children,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-2.5 rounded-md font-medium cursor-pointer ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
