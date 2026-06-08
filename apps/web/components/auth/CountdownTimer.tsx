"use client"

import { useEffect, useState, useRef } from "react"
import { signOut } from "next-auth/react"

type CountdownTimerProps = {
  createdAt: string
}

const THIRTY_MINUTES = 30 * 60 * 1000

export function CountdownTimer({ createdAt }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function calculateTimeLeft() {
      const created = new Date(createdAt).getTime()
      const elapsed = Date.now() - created
      return THIRTY_MINUTES - elapsed
    }

    const initial = calculateTimeLeft()
    if (initial <= 0) {
      signOut({ callbackUrl: "/" })
      return
    }

    setTimeLeft(initial)

    const interval = setInterval(() => {
      const remaining = calculateTimeLeft()
      if (remaining <= 0) {
        clearInterval(interval)
        signOut({ callbackUrl: "/" })
        return
      }
      setTimeLeft(remaining)
    }, 1000)

    return () => clearInterval(interval)
  }, [createdAt])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (timeLeft === null) return null

  const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

  const progress = Math.max(0, timeLeft / THIRTY_MINUTES)
  const isUrgent = timeLeft < 5 * 60 * 1000

  const size = 64
  const strokeWidth = 3
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div className="fixed bottom-24 left-6 z-50" ref={popupRef}>
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-64 bg-background border border-neutral rounded-lg shadow-lg p-4 mb-2">
          <p className="text-xs font-medium text-text mb-2">
            Portfolio demo account
          </p>
          <p className="text-xs text-muted leading-relaxed">
            To respect your privacy, this account will be automatically signed
            out and permanently deleted after 30 minutes. If you would like to
            continue exploring, you can sign in again at any time.
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-3 text-xs text-primary hover:underline"
          >
            Got it
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Account timer information"
        className="relative flex items-center justify-center w-16 h-16 rounded-full bg-background border border-neutral shadow-lg hover:shadow-xl transition-shadow duration-200"
      >
        <svg
          width={size}
          height={size}
          className="absolute inset-0 -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E8E0D0"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isUrgent ? "#C4622D" : "#3D5A3E"}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s ease" }}
          />
        </svg>

        <span
          className={`relative text-xs font-medium tabular-nums ${
            isUrgent ? "text-accent" : "text-text"
          }`}
        >
          {formatted}
        </span>
      </button>
    </div>
  )
}
