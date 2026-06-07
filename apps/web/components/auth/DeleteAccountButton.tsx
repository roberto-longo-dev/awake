"use client"

import { useState, useTransition } from "react"
import { deleteAccount } from "@/app/dashboard/actions"

export function DeleteAccountButton() {
  const [confirming, setConfirming] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleConfirm() {
    startTransition(async () => {
      await deleteAccount()
    })
  }

  if (confirming) {
    return (
      <div className="space-y-3">
        <p className="text-xs text-muted">
          This will permanently delete your account and all associated data.
          This cannot be undone.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={handleConfirm}
            disabled={isPending}
            className="text-xs font-medium tracking-widest uppercase text-accent hover:opacity-70 disabled:opacity-40 transition-opacity duration-200 cursor-pointer"
          >
            {isPending ? "Deleting..." : "Yes, delete my account"}
          </button>
          <button
            onClick={() => setConfirming(false)}
            disabled={isPending}
            className="text-xs font-medium tracking-widest uppercase text-muted hover:text-text disabled:opacity-40 transition-colors duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs font-medium tracking-widest uppercase text-accent hover:opacity-70 transition-opacity duration-200 cursor-pointer"
    >
      Delete Account
    </button>
  )
}
