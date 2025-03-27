"use client"

import Image from "next/image"
import { IProduct } from "@/interface/store"
import { useState, useEffect } from "react"

interface OrderItemProp {
  data: IProduct
}
const OrderItem: React.FC<OrderItemProp> = ({ ...props }) => {
  const { data } = props
  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) return null
  return (
    <li className="flex-col py-6 md:flex border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          priority
          fill
          src={data.image[0]?.url}
          alt="cart product image"
          className="object-cover object-center"
          sizes="100"
        />
      </div>
      {/* <div className="relative ml:4 flex flex-1 flex-col sm:ml-6"> */}
      <div className="relative pr-9 sm:grid sm:grid-cols-8 sm:gap-x-6 sm:pr-0">
        <div className="col-span-2 ">
          <p className="text-lg font-semibold text-black">{data.name}</p>
        </div>
        <div className="mt-1 flex text-sm col-span-6">
          <div className="text-gray-900 flex">
            <p className="text-gray-500">color</p>: {data.color.name}
          </div>
          <div className="text-gray-900 ml-4 border-l border-gray-500 pl-4 flex">
            <p className="text-gray-500">size</p>: {data.size.name}
          </div>
        </div>
        {/* </div> */}
      </div>
    </li>
  )
}

export default OrderItem
