"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { LoaderIcon } from "lucide-react"
import { IOrder } from "@/interface/store"
import { formattedCurrency } from "@/lib/utils"
import OrderItem from "./components/orderItem"
const OrderId = () => {
  const params = useParams()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [order, setOrder] = useState<IOrder>()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const getOrder = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/order/${params.orderId}`
        )
        const data = await response.json()
        setOrder(data)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        console.log(err)
      }
    }
    getOrder()
  }, [])

  if (!isMounted) return null
  const totalPrice = order?.orderItems?.reduce((total, item) => {
    return total + Number(item.product.price)
  }, 0)

  return (
    <div>
      <div>{isLoading && <LoaderIcon size={20} />}</div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 w-2/3 mx-auto border border-gray-500 shadow-2xl rounded-2xl p-4">
        <div className="col-span-3">
          {order?.orderItems?.map((item) => (
            <OrderItem key={item?.id} data={item?.product} />
          ))}
        </div>

        <div className="mt-6">
          <div className="text-gray-600">
            <div className="my-3">Recipient Information</div>
            <div>Name: {order?.name}</div>
            <div>Phone: {order?.phone}</div>
            <div>Address: {order?.address}</div>
          </div>
          <div className="text-gray-600 flex-col">
            Total
            <div>{totalPrice && formattedCurrency.format(+totalPrice)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderId
