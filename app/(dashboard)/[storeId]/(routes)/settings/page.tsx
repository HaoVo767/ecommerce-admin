import { auth } from "@clerk/nextjs/server"
import axios from "axios"
import { redirect } from "next/navigation"
import React from "react"
import SettingsForm from "./components/settings-form"
import { IStore } from "@/interface/store"
// interface ISettingsPageProps {
//   params: {
//     storeId: string
//   }
// }

async function SettingsPage({
  params,
}: {
  params: Promise<{ storeId: string }>
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
    return (
      <div>
        <SettingsForm initialData={store} />
      </div>
    )
  } catch (err) {
    console.log("error", err)
  }
}
export default SettingsPage
