import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { LoginForm } from "@/components/auth/LoginForm"

export const metadata = {
  title: "Login",
  description: "Sign in to your Awake account.",
}

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect("/dashboard")

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text mb-2">Welcome back</h1>
          <p className="text-sm text-muted">
            Sign in to access your account. New here? Just sign in and we will
            create your account automatically.
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-xs text-muted mt-6">
          By signing in you agree to our{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/cookies" className="text-primary hover:underline">
            Cookie Policy
          </a>
          .
        </p>
      </div>
    </main>
  )
}
