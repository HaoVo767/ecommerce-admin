import { ISize } from "@/interface/store"
import SizeForm from "./components/client"
import { format } from "date-fns"
import { SizeColumn } from "./[sizeId]/components/column"
// interface ISizeProps {
//   params: {
//     storeId: string
//   }
// }
async function Size({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params
  const getSizeData = async () => {
    try {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/size/findAllSize/${storeId}`,
      )
        .then((response) => response.json())
        .then((data: ISize[]) => {
          return data
        })
    } catch (err) {
      console.log(err)
      return []
    }
  }
  const sizeData = await getSizeData()

  const formatSize = (): SizeColumn[] => {
    return sizeData.map((item) => {
      return {
        ...item,
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
      }
    })
  }
  return (
    <div className="flex-col px-5">
      <div className="flex-1 space-y-4 pt-6"></div>
      <SizeForm data={formatSize()} />
    </div>
  )
}

export default Size
