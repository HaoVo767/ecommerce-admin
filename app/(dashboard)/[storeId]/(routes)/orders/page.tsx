import { IOrder } from "@/interface/store"
import OrderClient from "./components/client"
import { format } from "date-fns"
import { OrderColumn } from "./components/column"
import { formattedCurrency } from "@/lib/utils"
// interface IOrderProps {
//   params: {
//     storeId: string
//   }
// }
async function OrderPage({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params
  const getOrderData = async () => {
    try {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/order/findAllOrder/${storeId}`,
      )
        .then((response) => response.json())
        .then((data: IOrder[]) => {
          return data
        })
    } catch (err) {
      console.log(err)
      return []
    }
  }
  const orderData = await getOrderData()

  const formatOrder = (): OrderColumn[] => {
    return orderData.map((item) => {
      return {
        ...item,
        products: item.orderItems.map((orderItem) => orderItem.product?.name),
        totalPrice: formattedCurrency.format(
          item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
          }, 0),
        ),
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
      }
    })
  }
  return (
    <div className="flex-col px-5">
      <div className="flex-1 space-y-4 pt-6"></div>
      <OrderClient data={formatOrder()} />
    </div>
  )
}

export default OrderPage
