import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Banner } from "@/components/layout/Banner";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-neutral">
      <Banner />
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

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            aria-label="Member login"
            className="text-text-muted hover:text-text transition-colors duration-200"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="10" cy="7" r="3.5" />
              <path d="M2.5 18c0-4 3.358-7 7.5-7s7.5 3 7.5 7" />
            </svg>
          </Link>

          <Link href="/order">
            <Button variant="primary" className="!px-4 !py-1.5 text-sm">
              Order
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
