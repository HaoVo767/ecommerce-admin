"use client"

import { useEffect, useState } from "react"
import { OrderColumn } from "./column"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { View } from "lucide-react"

interface ICellActionPropPlus {
  storeId: string
}
interface ICellActionProps {
  data: OrderColumn
}
export const CellAction: React.FC<ICellActionProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  const router = useRouter()
  if (!isMounted) return null
  const { id, storeId } = data
  const handleViewOrder = () => {
    router.push(`/${storeId}/orders/${id}`)
  }
  return (
    <div>
      <Button onClick={handleViewOrder}>
        <View size={20} />
      </Button>
    </div>
  )
}
