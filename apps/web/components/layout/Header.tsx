"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Banner } from "@/components/layout/Banner";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-background border-b border-neutral"
    >
      <Banner />

      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: burger on mobile, nothing on desktop (logo takes this role in flow) */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-1 cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-text transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "translate-y-[8px] rotate-45"
                : "translate-y-0 rotate-0"
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-text transition-all duration-300 ease-in-out ${
              isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-text transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "translate-y-[-8px] -rotate-45"
                : "translate-y-0 rotate-0"
            }`}
          />
        </button>

        {/* Logo: absolutely centered on mobile, static left flex item on desktop */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0 font-bold tracking-logo text-text hover:underline transition-all duration-200"
        >
          AWAKE
        </Link>

        {/* Desktop nav: hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
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

        {/* Right side: login icon + Order button — always visible */}
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

          <Link href="/order" className="hidden md:inline-flex">
            <Button variant="primary" className="!px-4 !py-1.5 text-sm">
              Order
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-background border-b border-neutral py-4 px-6 space-y-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium py-2 text-text-muted hover:text-text transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
