"use client"
import { UserButton } from "@clerk/nextjs"
import { useStoreModal } from "@/hooks/use-store-modal"
import { useEffect } from "react"
export default function SetupPage() {
  const isOpen = useStoreModal((state) => state.isOpen)
  const onOpen = useStoreModal((state) => state.onOpen)
  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])
  return (
    <>
      <div className="flex justify-end mt-4 mr-4">
        <UserButton afterSwitchSessionUrl="/" />
        Hao
      </div>
    </>
  )
}
