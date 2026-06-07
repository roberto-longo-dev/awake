import { auth } from "@/auth"
import { Banner } from "@/components/layout/Banner"
import { HeaderInner } from "@/components/layout/HeaderInner"

export async function Header() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-neutral">
      <Banner />
      <HeaderInner user={session?.user ?? null} />
    </header>
  )
}
