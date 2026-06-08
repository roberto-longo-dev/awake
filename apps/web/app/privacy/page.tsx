import type { Metadata } from "next";
import Link from "next/link";
import { PRIVACY_HTML } from "@/lib/legal/privacy-policy"


export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Awake - how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
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
        dangerouslySetInnerHTML={{ __html: PRIVACY_HTML }}
      />
    </div>
  );
}
