"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { IProduct } from "@/interface/store"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ProductColumn, columns } from "../[productId]/components/column"
import { DataTable } from "@/components/ui/data-table"

interface IProductClientProps {
  data: ProductColumn[]
}
const ProductClient: React.FC<IProductClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Heading
            title={`Products (${data?.length || 0})`}
            description="Manage Product for your store"
          />
        </div>
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
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

export default ProductClient
