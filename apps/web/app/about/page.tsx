import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "We work directly with farmers in Ethiopia, Colombia, and Guatemala. Every lot is traceable to a single farm, a single harvest.",
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6">
      <section className="py-16 text-center">
        <p className="text-xs font-medium tracking-widest text-accent uppercase mb-4">
          OUR STORY
        </p>
        <h1 className="text-4xl font-bold text-text mb-6">
          We started with one question.
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          Why is it so hard to know where your coffee comes from?
        </p>
      </section>

      <hr className="border-t border-neutral my-12" />

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Traced to the source</h2>
        <p className="text-muted leading-relaxed">
          At Awake, we work directly with farmers in Ethiopia, Colombia, and
          Guatemala. Every lot we roast is traceable to a single farm, a single
          harvest, and a single decision to grow coffee the right way. No
          blends. No shortcuts. No mystery.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Scored before it ships</h2>
        <p className="text-muted leading-relaxed">
          Every coffee we carry scores above 85 on the SCA cupping scale,
          evaluated by a certified Q Grader. If it does not meet the standard,
          it does not reach your cup. That is the only rule we have.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Small by choice</h2>
        <p className="text-muted leading-relaxed">
          We roast in small batches because quality does not scale. We keep our
          offering tight, a handful of exceptional lots at a time, so we can
          stand behind every bag we sell.
        </p>
      </section>

      <hr className="border-t border-neutral my-12" />

      <section className="text-center py-8">
        <p className="text-xl font-bold mb-6">Ready to find your next coffee?</p>
        <Link href="/shop">
          <Button variant="primary">Explore our coffees</Button>
        </Link>
      </section>
    </main>
  );
}
