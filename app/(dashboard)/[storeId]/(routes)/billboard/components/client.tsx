"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { IBillboard } from "@/interface/store"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillboardColumn, columns } from "../[billboardId]/components/column"
import { DataTable } from "@/components/ui/data-table"

interface IBillboardClientProps {
  data: BillboardColumn[]
}
const BillboardClient: React.FC<IBillboardClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Heading
            title={`Billboards (${data?.length || 0})`}
            description="Manage billboards for your store"
          />
        </div>
        <Button onClick={() => router.push(`/${params.storeId}/billboard/new`)}>
          <Plus className="h-4 w-4" />
          Add new
        </Button>
      </div>
      <div className="mt-2 w-3/4 ml-10">
        <DataTable searchKey="label" columns={columns} data={data} />
      </div>
    </>
  )
}

export default BillboardClient
