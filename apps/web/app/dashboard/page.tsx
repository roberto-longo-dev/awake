import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { DeleteAccountButton } from "@/components/auth/DeleteAccountButton"
import { getCart, removeFromCart } from "@/lib/actions/cart"

export const metadata = {
  title: "Dashboard",
  description: "Your Awake account.",
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const cart = await getCart()

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

      {cart && cart.items.length > 0 ? (
        <div className="border border-neutral rounded-lg p-6 mt-6">
          <h2 className="text-xs font-medium tracking-widest text-muted uppercase mb-4">
            Your Cart
          </h2>
          <ul className="space-y-4">
            {cart.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-text font-medium">{item.productName}</p>
                  <p className="text-xs text-muted">&euro;{item.price} each</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-text">x{item.quantity}</span>
                  <span className="text-sm font-medium text-text">
                    &euro;{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <form action={removeFromCart.bind(null, item.id)}>
                    <button
                      type="submit"
                      className="text-xs text-muted hover:text-accent transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-neutral mt-4 pt-4 flex justify-between items-center">
            <span className="text-sm font-medium text-text">Total</span>
            <span className="text-sm font-bold text-text">
              &euro;{cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
            </span>
          </div>
        </div>
      ) : (
        <div className="border border-neutral rounded-lg p-6 mt-6">
          <h2 className="text-xs font-medium tracking-widest text-muted uppercase mb-4">
            Your Cart
          </h2>
          <p className="text-sm text-muted">Your cart is empty.</p>
        </div>
      )}
    </main>
  )
}
