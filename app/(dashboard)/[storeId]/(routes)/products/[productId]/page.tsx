import { IProduct } from "@/interface/store"
import ProductForm from "./components/product-form"

interface IParams {
  params: {
    productId: string | null
    storeId: string | null
  }
}

const ProductPage: React.FC<IParams> = async ({ params }) => {
  const { productId, storeId } = await params

  const fetchProduct = async (): Promise<IProduct | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/${productId}`,
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
  const products = await fetchProduct()

  return (
    <>
      <div>
        <ProductForm initialData={products} />
      </div>
    </>
  )
}

export default ProductPage
