import { IBillboard } from "@/interface/store"
import BillboardClient from "./components/client"
import { format } from "date-fns"
import { BillboardColumn } from "../billboard/[billboardId]/components/column"
// interface IBillboardProps {
//   params: {
//     storeId: string
//   }
// }
async function Billboard({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params
  const getBillboardData = async () => {
    try {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/billboard/findAllBillboard/${storeId}`,
      )
        .then((response) => response.json())
        .then((data: IBillboard[]) => {
          return data
        })
    } catch (err) {
      console.log(err)
      return []
    }
  }
  const billboardData = await getBillboardData()

  const formatBillboard = (): BillboardColumn[] => {
    return billboardData.map((item) => {
      return {
        ...item,
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
      }
    })
  }
  return (
    <div className="flex-col px-5">
      <div className="flex-1 space-y-4 pt-6"></div>
      <BillboardClient data={formatBillboard()} />
    </div>
  )
}

export default Billboard
