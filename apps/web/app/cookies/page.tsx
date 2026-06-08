import type { Metadata } from "next";
import Link from "next/link";
import { COOKIE_HTML } from "@/lib/legal/cookie-policy";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for Awake - how we use cookies and tracking technologies.",
};

export default function CookiesPage() {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="text-xs font-medium tracking-widest text-primary uppercase hover:border-b hover:border-primary transition-colors duration-200"
      >
        &larr; HOME
      </Link>

      <div
        className="prose prose-sm max-w-none mt-8 prose-headings:font-bold prose-headings:text-text prose-p:text-muted prose-a:text-primary prose-strong:text-text"
        dangerouslySetInnerHTML={{ __html: COOKIE_HTML }}
      />
    </div>
  );
}
