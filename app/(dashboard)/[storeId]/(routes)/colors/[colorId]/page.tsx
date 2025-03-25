import { IColor } from "@/interface/store"
import ColorForm from "./components/color-form"

interface IParams {
  params: {
    colorId: string | null
    storeId: string | null
  }
}

const ColorPage: React.FC<IParams> = async ({ params }) => {
  const { colorId } = await params

  const fetchColor = async (): Promise<IColor | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/color/${colorId}`,
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
  const colors = await fetchColor()

  return (
    <>
      <div>
        <ColorForm initialData={colors} />
      </div>
    </>
  )
}

export default ColorPage
