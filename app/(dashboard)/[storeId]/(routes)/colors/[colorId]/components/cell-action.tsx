"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColorColumn } from "./column"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { AlertModal } from "@/components/modals/alert-modal"
import Heading from "@/components/ui/heading"
import ApiList from "@/components/api_list"

interface ICellActionProps {
  data: ColorColumn
}
export const CellAction: React.FC<ICellActionProps> = ({ data }) => {
  const { id } = data
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const onCopy = () => {
    navigator.clipboard.writeText(id)
    toast.info("Copy id to clipboard", {
      position: "top-center",
    })
  }
  const handleUpdate = () => {
    router.push(`/${params?.storeId}/colors/${id}`)
  }

  const handleDelete = async () => {
    try {
      // setIsLoading(true)
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/color/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
      // router.push(`/${params?.storeId}/billboard`)
      toast.success("Color deleted", { position: "top-center" })
    } catch (err) {
      toast.error("Something went wrong", {
        position: "top-center",
      })
    } finally {
      if (typeof window !== "undefined") {
        window.location.reload()
      }
      // router.refresh()
      setIsOpen(false)
      // setIsLoading(false)
    }
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} disabled={isLoading}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>action</DropdownMenuLabel>
          <DropdownMenuItem onClick={onCopy}>
            <Copy /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUpdate}>
            <Edit /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
      {/* <Heading title={"API"} description={"Api call for billboards"} /> */}
      {/* <ApiList /> */}
    </div>
  )
}
