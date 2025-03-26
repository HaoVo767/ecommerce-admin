import { IProduct } from "@/interface/store"
import ProductClient from "./components/client"
import { format } from "date-fns"
import { ProductColumn } from "../products/[productId]/components/column"
import { formattedCurrency } from "@/lib/utils"
// interface IProductProps {
//   params: {
//     storeId: string
//   }
// }
async function Product({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params
  const getProductData = async () => {
    try {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/findAllProduct/${storeId}`,
      )
        .then((response) => response.json())
        .then((data: IProduct[]) => {
          return data
        })
    } catch (err) {
      console.log(err)
      return []
    }
  }
  const products = await getProductData()

  const formatProduct = (): ProductColumn[] => {
    return products.map((item) => {
      return {
        ...item,
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formattedCurrency.format(item.price),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
      }
    })
  }
  return (
    <div className="flex-col px-5">
      <div className="flex-1 space-y-4 pt-6"></div>
      <ProductClient data={formatProduct()} />
    </div>
  )
}

export default Product
