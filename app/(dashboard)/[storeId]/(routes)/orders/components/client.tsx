"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { DataTable } from "@/components/ui/data-table"
import { columns, OrderColumn } from "./column"

interface IOrderClientProps {
  data: OrderColumn[]
}
const OrderClient: React.FC<IOrderClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Heading
            title={`Orders (${data?.length || 0})`}
            description="Manage orders for your store"
          />
        </div>
        {/* <Button onClick={() => router.push(`/${params.storeId}/orders/new`)}>
          <Plus className="h-4 w-4" />
          Add new
        </Button> */}
      </div>
      <div className="mt-2 w-3/4 ml-10">
        <DataTable searchKey="name" columns={columns} data={data} />
      </div>
    </>
  )
}

export default OrderClient
