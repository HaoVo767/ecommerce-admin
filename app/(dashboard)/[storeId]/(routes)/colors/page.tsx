import { IColor } from "@/interface/store"
import ColorForm from "./components/client"
import { format } from "date-fns"
import { ColorColumn } from "./[colorId]/components/column"
// interface IColorProps {
//   params: {
//     storeId: string
//   }
// }
async function Color({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params
  const getColorData = async () => {
    try {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/color/findAllColor/${storeId}`,
      )
        .then((response) => response.json())
        .then((data: IColor[]) => {
          return data
        })
    } catch (err) {
      console.log(err)
      return []
    }
  }
  const colorData = await getColorData()

  const formatColor = (): ColorColumn[] => {
    return colorData.map((item) => {
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
      <ColorForm data={formatColor()} />
    </div>
  )
}

export default Color
