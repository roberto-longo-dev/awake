import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="text-xs font-medium tracking-widest text-accent uppercase mb-4">
        MEMBERS AREA
      </p>
      <h1 className="font-bold text-3xl mb-4">Member login coming soon.</h1>
      <p className="text-text-muted">
        Private member area is under development. Check back for updates.
      </p>
      <Link
        href="/"
        className="text-xs font-medium tracking-widest text-primary uppercase hover:border-b hover:border-primary transition-colors duration-200 mt-8 inline-block"
      >
        &larr; HOME
      </Link>
    </div>
  );
}
