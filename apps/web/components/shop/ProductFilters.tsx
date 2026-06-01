"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

type CoverImage = {
  asset: object;
  alt?: string;
};

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  origin: string;
  region: string;
  process: string;
  roastLevel: string;
  price: number;
  weight: number;
  excerpt: string;
  tastingNotes: string[];
  inStock: boolean;
  coverImage?: CoverImage;
};

type Props = {
  products: Product[];
  onFilter: (filtered: Product[]) => void;
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}

export function ProductFilters({ products, onFilter }: Props) {
  const [activeOrigin, setActiveOrigin] = useState<string | null>(null);
  const [activeProcess, setActiveProcess] = useState<string | null>(null);
  const [activeRoast, setActiveRoast] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const origins = unique(products.map((p) => p.origin));
  const processes = unique(products.map((p) => p.process));
  const roastLevels = unique(products.map((p) => p.roastLevel));

  const activeCount = [activeOrigin, activeProcess, activeRoast].filter(
    Boolean
  ).length;
  const hasActiveFilter = activeCount > 0;

  useEffect(() => {
    const filtered = products.filter((p) => {
      if (activeOrigin && p.origin !== activeOrigin) return false;
      if (activeProcess && p.process !== activeProcess) return false;
      if (activeRoast && p.roastLevel !== activeRoast) return false;
      return true;
    });
    onFilter(filtered);
  }, [activeOrigin, activeProcess, activeRoast, products, onFilter]);

  useEffect(() => {
    if (!drawerOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen]);

  function closeDrawer() {
    setDrawerOpen(false);
    requestAnimationFrame(() => filterButtonRef.current?.focus());
  }

  function chipClass(active: boolean) {
    const base =
      "text-xs font-medium px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors duration-200 cursor-pointer";
    return active
      ? `${base} border-primary bg-primary text-background`
      : `${base} border-neutral text-muted hover:border-primary hover:text-primary`;
  }

  function toggle(
    value: string,
    current: string | null,
    setter: (v: string | null) => void
  ) {
    setter(current === value ? null : value);
  }

  function clearAll() {
    setActiveOrigin(null);
    setActiveProcess(null);
    setActiveRoast(null);
  }

  return (
    <>
      {/* Desktop: chip row inside a neutral container */}
      <div className="hidden md:block">
        <div className="bg-neutral/50 rounded-lg px-4 py-3 flex items-center gap-2 flex-wrap">
          <div role="group" aria-label="Filter by origin" className="flex gap-2 items-center">
            <span className="text-xs text-muted uppercase tracking-widest mr-1 whitespace-nowrap">
              Origin
            </span>
            {origins.map((origin) => (
              <button
                key={origin}
                type="button"
                aria-pressed={activeOrigin === origin}
                className={chipClass(activeOrigin === origin)}
                onClick={() => toggle(origin, activeOrigin, setActiveOrigin)}
              >
                {origin}
              </button>
            ))}
          </div>

          <div className="w-px h-4 bg-neutral self-center" aria-hidden="true" />

          <div role="group" aria-label="Filter by process" className="flex gap-2 items-center">
            <span className="text-xs text-muted uppercase tracking-widest mr-1 whitespace-nowrap">
              Process
            </span>
            {processes.map((process) => (
              <button
                key={process}
                type="button"
                aria-pressed={activeProcess === process}
                className={chipClass(activeProcess === process)}
                onClick={() => toggle(process, activeProcess, setActiveProcess)}
              >
                {capitalize(process)}
              </button>
            ))}
          </div>

          <div className="w-px h-4 bg-neutral self-center" aria-hidden="true" />

          <div role="group" aria-label="Filter by roast" className="flex gap-2 items-center">
            <span className="text-xs text-muted uppercase tracking-widest mr-1 whitespace-nowrap">
              Roast
            </span>
            {roastLevels.map((roast) => (
              <button
                key={roast}
                type="button"
                aria-pressed={activeRoast === roast}
                className={chipClass(activeRoast === roast)}
                onClick={() => toggle(roast, activeRoast, setActiveRoast)}
              >
                {capitalize(roast)}
              </button>
            ))}
          </div>

          {hasActiveFilter && (
            <>
              <div className="w-px h-4 bg-neutral self-center" aria-hidden="true" />
              <button
                type="button"
                aria-label="Clear all filters"
                className="text-xs text-muted hover:text-text transition-colors duration-200 whitespace-nowrap"
                onClick={clearAll}
              >
                Clear filters
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile: floating Filter button */}
      <button
        ref={filterButtonRef}
        type="button"
        aria-label={drawerOpen ? "Close filters" : "Open filters"}
        aria-expanded={drawerOpen}
        aria-controls="mobile-filter-drawer"
        className="flex md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-primary text-background px-6 py-2.5 rounded-full text-sm font-medium shadow-lg"
        onClick={() => setDrawerOpen(true)}
      >
        {activeCount > 0 ? `Filter (${activeCount})` : "Filter"}
      </button>

      {/* Mobile: backdrop */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 bg-text/20 z-40 md:hidden transition-opacity duration-300 ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
      />

      {/* Mobile: bottom drawer */}
      <div
        id="mobile-filter-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        aria-hidden={!drawerOpen}
        className={`fixed inset-x-0 bottom-0 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-background rounded-t-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-base">Filter</span>
            <button
              type="button"
              aria-label="Close filters"
              className="text-muted hover:text-text transition-colors duration-200"
              onClick={closeDrawer}
            >
              &#x2715;
            </button>
          </div>

          <div role="group" aria-label="Filter by origin" className="mb-6">
            <p className="text-xs uppercase tracking-widest text-muted mb-3">
              Origin
            </p>
            <div className="flex flex-wrap gap-2">
              {origins.map((origin) => (
                <button
                  key={origin}
                  type="button"
                  aria-pressed={activeOrigin === origin}
                  className={chipClass(activeOrigin === origin)}
                  onClick={() => toggle(origin, activeOrigin, setActiveOrigin)}
                >
                  {origin}
                </button>
              ))}
            </div>
          </div>

          <div role="group" aria-label="Filter by process" className="mb-6">
            <p className="text-xs uppercase tracking-widest text-muted mb-3">
              Process
            </p>
            <div className="flex flex-wrap gap-2">
              {processes.map((process) => (
                <button
                  key={process}
                  type="button"
                  aria-pressed={activeProcess === process}
                  className={chipClass(activeProcess === process)}
                  onClick={() =>
                    toggle(process, activeProcess, setActiveProcess)
                  }
                >
                  {capitalize(process)}
                </button>
              ))}
            </div>
          </div>

          <div role="group" aria-label="Filter by roast" className="mb-6">
            <p className="text-xs uppercase tracking-widest text-muted mb-3">
              Roast
            </p>
            <div className="flex flex-wrap gap-2">
              {roastLevels.map((roast) => (
                <button
                  key={roast}
                  type="button"
                  aria-pressed={activeRoast === roast}
                  className={chipClass(activeRoast === roast)}
                  onClick={() => toggle(roast, activeRoast, setActiveRoast)}
                >
                  {capitalize(roast)}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral pt-4 mt-2 flex gap-3">
            {hasActiveFilter && (
              <Button variant="secondary" className="flex-1" onClick={clearAll}>
                Clear
              </Button>
            )}
            <Button
              variant="primary"
              className="flex-1"
              aria-label="Apply filters and close"
              onClick={closeDrawer}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
