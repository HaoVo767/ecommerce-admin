import { auth } from "@clerk/nextjs/server"
import axios from "axios"
import { error } from "console"
import { redirect } from "next/navigation"

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  if (!userId) {
    redirect("/sign-in")
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/store/findFirstUserStore`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    }
  )
  const stores = await response.json()
  if (stores) {
    redirect(`/${stores?.id}/orders`)
  }

  return <>{children}</>
}
