"use client"

import { useState, useRef, useEffect } from "react"
import { signOut } from "next-auth/react"
import Link from "next/link"

type UserMenuProps = {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close on Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="User menu"
        className="text-muted hover:text-text transition-colors duration-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 w-48 bg-background border border-neutral rounded-lg shadow-sm py-1 z-50">
          {user.email && (
            <div className="px-4 py-2 border-b border-neutral">
              <p className="text-xs text-muted truncate">{user.email}</p>
            </div>
          )}
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm text-text hover:bg-neutral/50 transition-colors duration-200"
          >
            Dashboard
          </Link>
          <button
            onClick={() => {
              setIsOpen(false)
              signOut({ callbackUrl: "/" })
            }}
            className="w-full text-left px-4 py-2 text-sm text-text hover:bg-neutral/50 transition-colors duration-200"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
