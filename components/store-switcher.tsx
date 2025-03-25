"use client"

import { useState } from "react"
import { PopoverTrigger } from "@/components/ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal"
import { IStore } from "@/interface/store"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronsUpDown, CirclePlus, Store } from "lucide-react"

// import { PopoverContent } from "@radix-ui/react-popover"
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: IStore[]
}

export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const storeModal = useStoreModal()
  const params = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const formattedItems = items.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId,
  )

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false)
    router.push(`${store.value}`)
  }

  const handleAddNewStore = () => {
    storeModal.onOpen()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          role="combobox"
          aria-label="select a store"
        >
          <Store />
          {currentStore?.label}
          <ChevronsUpDown className="opacity-50 h-3 w-2 ml-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel className="text-stone-500 font-normal">
          Store
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {formattedItems.map((item) => (
            <DropdownMenuItem key={item.value} className="focus:bg-transparent">
              <Link href={`/${item.value}`} className="flex">
                <Store className="mr-2" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuGroup>
            <DropdownMenuItem className="focus:bg-transparent">
              <Button
                variant={"outline"}
                className=""
                onClick={handleAddNewStore}
              >
                <CirclePlus />
                Add new store
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
