import Link from "next/link";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-neutral">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold tracking-logo text-text hover:underline transition-all duration-200"
        >
          AWAKE
        </Link>

        <nav className="flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-text-muted hover:text-text hover:border-b hover:border-text transition duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        <Button variant="primary" className="!px-4 !py-1.5 text-sm">
          Order
        </Button>
      </div>
    </header>
  );
}
