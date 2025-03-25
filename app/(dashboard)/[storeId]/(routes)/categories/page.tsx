import { ICategories } from "@/interface/store"
import CategoriesClient from "./components/client"
import { format } from "date-fns"
import { CategoriesColumn } from "./[categoryId]/components/column"
interface ICategoriesProps {
  params: {
    storeId: string
  }
}
const Categories: React.FC<ICategoriesProps> = async ({ params }) => {
  const { storeId } = await params
  const getCategoriesData = async () => {
    try {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/category/findAllCategory/${storeId}`,
      )
        .then((response) => response.json())
        .then((data: ICategories[]) => {
          return data
        })
    } catch (err) {
      console.log(err)
      return []
    }
  }
  const categoriesData = await getCategoriesData()

  const formatCategories = (): CategoriesColumn[] => {
    if (categoriesData?.length === 0) {
      return []
    } else {
      return categoriesData?.map((item) => {
        return {
          ...item,
          id: item.id,
          name: item.name,
          billboardLabel: item.billboard?.label,
          createdAt: format(item.createdAt, "MMMM do, yyyy"),
        }
      })
    }
  }
  return (
    <div className="flex-col px-5">
      <div className="flex-1 space-y-4 pt-6"></div>
      <CategoriesClient data={formatCategories()} />
    </div>
  )
}

export default Categories
