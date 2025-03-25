"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { SizeColumn, columns } from "../[sizeId]/components/column"
import { DataTable } from "@/components/ui/data-table"

interface ISizeClientProps {
  data: SizeColumn[]
}
const SizeClient: React.FC<ISizeClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Heading
            title={`Size (${data?.length || 0})`}
            description="Manage Size for your store"
          />
        </div>
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="h-4 w-4" />
          Add new
        </Button>
      </div>
      <div className="mt-2 w-3/4 ml-10">
        <DataTable searchKey="name" columns={columns} data={data} />
      </div>
    </>
  )
}

export default SizeClient
