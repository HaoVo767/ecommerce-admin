import { auth } from "@clerk/nextjs/server"
import axios from "axios"
import { redirect } from "next/navigation"
import Navbar from "@/components/navbar"

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const { userId } = await auth()
  const { storeId } = await params
  if (!userId) {
    redirect("/sign-in")
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/store/${storeId}`,
      {
        method: "GET",
      },
    )
    const store = await response.json()
    console.log("storeeeeee ", store)
    if (!store) {
      redirect("/")
    }
  } catch (err) {
    console.log("err", err)
    redirect("/")
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
