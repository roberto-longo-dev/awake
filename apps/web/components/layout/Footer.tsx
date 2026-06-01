import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral/50 border-t border-neutral py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <span className="font-bold tracking-widest text-sm">AWAKE</span>
          <nav className="flex gap-6">
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
          </nav>
        </div>
        <p className="text-center mt-4 text-xs text-muted">
          This is a portfolio project. No products are sold.
        </p>
      </div>
    </footer>
  );
}
