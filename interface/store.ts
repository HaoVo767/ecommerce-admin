import { symlink } from "fs"

export interface IStore {
  id: string
  name: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface IBillboard {
  id: string
  storeId: string
  store: IStore
  label: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface ICategories {
  id: string
  storeId: string
  store: IStore
  billboardId: string
  billboard: IBillboard
  name: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface ISize {
  id: string
  storeId: string
  store: IStore
  name: string
  value: string
  createdAt: Date
  updatedAt: Date
}

export interface IColor {
  id: string
  storeId: string
  store: IStore
  name: string
  value: string
  createdAt: Date
  updatedAt: Date
}

export interface IImage {
  id: string
  productId: string
  product: IProduct
  url: string
  createdAt: Date
  updatedAt: Date
}

export interface IProduct {
  id: string
  storeId: string
  store: IStore
  categoryId: string
  category: ICategories
  name: string
  price: number
  isFeatured: boolean
  isArchived: boolean
  sizeId: string
  size: ISize
  colorId: string
  color: IColor
  image: IImage[]
  createdAt: Date
  updatedAt: Date
}

export interface IOrder {
  id: string
  storeId: string
  store: IStore
  orderItems: IOrderItems[]
  name: string
  isPaid: boolean
  phone: string
  address: string
  createdAt: Date
  updatedAt: Date
}

export interface IOrderItems {
  id: string
  orderId: string
  order: IOrder
  productId: string
  product: IProduct
  createdAt: Date
  updatedAt: Date
}
