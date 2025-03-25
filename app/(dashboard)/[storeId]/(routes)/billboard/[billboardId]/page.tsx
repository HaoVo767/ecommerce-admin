import { IBillboard } from "@/interface/store"
import BillboardForm from "./components/billboard-form"

interface IParams {
  params: {
    billboardId: string
  }
}

const BillboardPage: React.FC<IParams> = async ({ params }) => {
  const { billboardId } = await params

  const fetchBillboard = async (): Promise<IBillboard | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/billboard/${billboardId}`,
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
  const billboard = await fetchBillboard()

  return (
    <>
      <div>
        <BillboardForm initialData={billboard} />
      </div>
    </>
  )
}

export default BillboardPage
