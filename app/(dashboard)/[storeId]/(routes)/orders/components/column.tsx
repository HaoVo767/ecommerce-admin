"use client"
import { StringValidation } from "zod"
import { CellAction } from "./cell-action"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string
  storeId: string
  name: string
  phone: string
  address: string
  isPaid: boolean
  totalPrice: string
  products: string[]
  createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  // {
  //   accessorKey: "isPaid",
  //   header: "Paid ",
  // },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
