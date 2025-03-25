"use client"
import { CellAction } from "./cell-action"

import { ColumnDef } from "@tanstack/react-table"

export type CategoriesColumn = {
  id: string
  createdAt: string
  name: string
  billboardLabel: string
}

export const columns: ColumnDef<CategoriesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
