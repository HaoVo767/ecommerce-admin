import { ICategories, IBillboard } from "@/interface/store"
import CategoryForm from "./components/category-form"

interface IParams {
  params: {
    categoryId: string | null
    storeId: string | null
  }
}

const CategoryPage: React.FC<IParams> = async ({ params }) => {
  const { categoryId, storeId } = await params

  const fetchCategory = async (): Promise<ICategories | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/category/${categoryId}`,
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
  const categories = await fetchCategory()

  const fetchBillboardForSelect = async (): Promise<IBillboard[] | null> => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/billboard/findAllBillboard/${storeId}`,
    )
      .then((response) => response.json())
      .then((data: IBillboard[]) => {
        return data
      })
      .catch((error) => {
        console.log(error)
        return null
      })
  }
  const billboardForSelect = await fetchBillboardForSelect()
  return (
    <>
      <div>
        <CategoryForm
          initialData={categories}
          allBillboard={billboardForSelect}
        />
      </div>
    </>
  )
}

export default CategoryPage
