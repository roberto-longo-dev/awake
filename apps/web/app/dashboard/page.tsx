import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { DeleteAccountButton } from "@/components/auth/DeleteAccountButton"

export const metadata = {
  title: "Dashboard",
  description: "Your Awake account.",
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-text mb-8">Dashboard</h1>

      <div className="border border-neutral rounded-lg p-6">
        <h2 className="text-xs font-medium tracking-widest text-muted uppercase mb-4">
          Personal Info
        </h2>
        <dl className="space-y-3">
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs text-muted">Name</dt>
            <dd className="text-sm text-text">{session.user?.name ?? "—"}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs text-muted">Email</dt>
            <dd className="text-sm text-text">{session.user?.email ?? "—"}</dd>
          </div>
        </dl>

        <div className="mt-6 pt-6 border-t border-neutral">
          <DeleteAccountButton />
        </div>
      </div>
    </main>
  )
}
