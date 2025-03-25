import { ISize } from "@/interface/store"
import SizeForm from "./components/size-form"

interface IParams {
  params: {
    sizeId: string | null
    storeId: string | null
  }
}

const SizePage: React.FC<IParams> = async ({ params }) => {
  const { sizeId } = await params

  const fetchSize = async (): Promise<ISize | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/size/${sizeId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      )
      if (!response.ok) {
        return null
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }
  const sizes = await fetchSize()

  return (
    <>
      <div>
        <SizeForm initialData={sizes} />
      </div>
    </>
  )
}

export default SizePage
