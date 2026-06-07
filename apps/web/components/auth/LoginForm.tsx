"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/Button"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState("")

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    setError("")
    try {
      const result = await signIn("resend", {
        email,
        redirect: false,
      })
      if (result?.error) {
        setError("Something went wrong. Please try again.")
      } else {
        setIsSent(true)
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true)
    await signIn("google", { callbackUrl: "/dashboard" })
  }

  if (isSent) {
    return (
      <div className="text-center py-8">
        <p className="text-text font-medium mb-2">Check your email</p>
        <p className="text-sm text-muted">
          We sent a sign-in link to <strong>{email}</strong>. Check your inbox
          and click the link to sign in.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Button
        variant="secondary"
        className="w-full flex items-center justify-center gap-3"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
            fill="#4285F4"
          />
          <path
            d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
            fill="#34A853"
          />
          <path
            d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
            fill="#FBBC05"
          />
          <path
            d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-3 text-muted">
            or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
          className="w-full px-4 py-2.5 text-sm border border-neutral rounded-md
            bg-background text-text placeholder:text-muted
            focus:outline-none focus:border-primary transition-colors duration-200"
        />
        {error && <p className="text-xs text-accent">{error}</p>}
        <Button
          variant="primary"
          className="w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send magic link"}
        </Button>
      </form>
    </div>
  )
}
