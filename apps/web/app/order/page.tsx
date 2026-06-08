import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "Online ordering is coming soon to Awake.",
};

export default function OrderPage() {
  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="text-xs font-medium tracking-widest text-accent uppercase mb-4">
        COMING SOON
      </p>
      <h1 className="font-bold text-3xl mb-4">Orders are not available yet.</h1>
      <p className="text-text-muted">
        We are working on it. Check back soon.
      </p>
      <Link
        href="/shop"
        className="text-xs font-medium tracking-widest text-primary uppercase hover:border-b hover:border-primary transition-colors duration-200 mt-8 inline-block"
      >
        &larr; BACK TO SHOP
      </Link>
    </div>
  );
}
