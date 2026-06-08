import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral/50 border-t border-neutral py-8 px-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center">
          <Link
            href="/"
            className="font-bold tracking-logo text-text hover:underline transition-all duration-200"
          >
            AWAKE
          </Link>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              href="/privacy"
              className="text-xs text-muted hover:text-text transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="text-xs text-muted hover:text-text transition-colors duration-200"
            >
              Cookie Policy
            </Link>
            <a
              href="#"
              className="termly-display-preferences text-xs text-muted hover:text-text transition-colors duration-200"
            >
              Consent Preferences
            </a>
          </nav>
        </div>
        <p className="text-center mt-4 text-xs text-muted">
          This is a portfolio project. No products are sold.
        </p>
      </div>
    </footer>
  );
}
