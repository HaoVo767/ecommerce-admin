"use client"

import { ICategories, IColor, IProduct, ISize, IImage } from "@/interface/store"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useParams, useRouter } from "next/navigation"
import Heading from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { AlertModal } from "@/components/modals/alert-modal"
import Image from "next/image"
import { ImagePlus, Trash } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import { placeholderSvg } from "@/public/image/placeholderImage"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
interface IProductFormProps {
  initialData: IProduct | null
}

const ProductForm: React.FC<IProductFormProps> = ({ initialData }) => {
  const router = useRouter()
  const { storeId } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [allCategory, setAllCategory] = useState<ICategories[]>([])
  const [allSize, setAllSize] = useState<ISize[]>([])
  const [allColor, setAllColor] = useState<IColor[]>([])
  const [imageUrl, setImageUrl] = useState<Partial<IImage>[]>(
    initialData ? initialData?.image : []
  )
  const [formData, setFormData] = useState<Partial<IProduct>>(
    initialData
      ? { ...initialData, price: +initialData.price }
      : { isFeatured: false, isArchived: false }
  )
  const [errorMessage, setErrorMessage] = useState<string[]>()

  const onChangeFormData = (item: any) => {
    setFormData((prev) => ({ ...prev, ...item }))
    setErrorMessage([])
  }
  // console.log("formData", formData)
  const title = initialData ? "Edit Product" : "Create Product"
  const description = initialData ? "Edit Product" : "Add new Product"
  const toastMessage = initialData ? "Updated success" : "Created successful"
  const action = initialData ? "Save changes" : "Create"

  const handleRemoveImage = (data: string | undefined) => {
    const removeImage = imageUrl?.filter((item) => item.url !== data)
    return setImageUrl(removeImage)
  }

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category/findAllCategory/${storeId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    )
      .then((response) => response.json())
      .then((data) => setAllCategory(data))
      .catch((err) => console.log(err))

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/size/findAllSize/${storeId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => setAllSize(data))
      .catch((err) => console.log(err))

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/color/findAllColor/${storeId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => setAllColor(data))
      .catch((err) => console.log(err))
  }, [storeId])

  const handleSubmit = async () => {
    const formSubmit = {
      ...formData,
      images: imageUrl,
      price: +(formData.price || 0)
    }
    // console.log("formSubmit", formSubmit)

    if (initialData) {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/${initialData?.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formSubmit
          })
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.message)
            return
          }
          router.refresh()
          router.push(`/${storeId}/products`)
          toast.success(`${toastMessage}`, {
            position: "top-center"
          })
        })
        .catch((err) => {
          console.log(err)
          toast.error("Somthing went wrong", {
            position: "top-center"
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/${storeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formSubmit
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.message)
            return
          }
          router.refresh()
          router.push(`/${storeId}/products`)
          toast.success(`${toastMessage}`, {
            position: "top-center"
          })
        })
        .catch((err) => {
          console.log(err)
          toast.error("Something went wrong", {
            position: "top-center"
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/${initialData?.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        }
      )
      setIsOpen(false)
      router.refresh()
      router.push(`/${storeId}/products`)
      toast.success("Product deleted", { position: "top-center" })
    } catch (err) {
      toast.error("Something went wrong", {
        position: "top-center"
      })
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <div className="ml-4 mt-4 flex justify-between">
        <div>
          <Heading title={title} description={description} />
        </div>
        {initialData && (
          <Button
            disabled={isLoading}
            className="mr-10"
            variant={"destructive"}
            size={"icon"}
            onClick={() => {
              setIsOpen(true)
            }}
          >
            <Trash />
          </Button>
        )}
      </div>
      <Separator className="mt-2" />

      <div className="flex gap-x-4 flex-wrap">
        {imageUrl.length !== 0 &&
          imageUrl.map((image: Partial<IImage>) => (
            <div
              className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
              key={image.url}
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  variant={"destructive"}
                  className="absolute top-2 right-2"
                  size={"icon"}
                  onClick={() => handleRemoveImage(image.url)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                src={
                  image?.url && image.url !== "" ? image.url : placeholderSvg
                }
                alt="image"
                className="object-cover"
                width={300}
                height={300}
              />
            </div>
          ))}
      </div>

      <CldUploadWidget
        uploadPreset="preset_1"
        onSuccess={(result) => {
          setImageUrl((prev: any) => {
            return typeof result.info !== "string" && result.info?.url
              ? [...prev, { url: result.info?.url }]
              : prev
          })
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open()
          }
          return (
            <div className="mt-4">
              <Button
                type="button"
                // disabled={disable}
                variant={"secondary"}
                onClick={onClick}
              >
                <ImagePlus className="h-4 w-4" />
                Upload an image
              </Button>
            </div>
          )
        }}
      </CldUploadWidget>

      <div className="flex mt-6 gap-x-4 ml-4">
        <div className="w-1/3 ">
          <div>Name</div>
          <Input
            className="mt-2"
            disabled={isLoading}
            placeholder="Product name"
            value={formData?.name ? formData.name : ""}
            onChange={(e) => onChangeFormData({ name: e.target.value })}
          />
        </div>

        <div className="w-1/3">
          <div>Price</div>
          <Input
            className="mt-2"
            disabled={isLoading}
            placeholder="100.000 VND"
            value={formData?.price ? formData?.price : ""}
            onChange={(e) => onChangeFormData({ price: e.target.value })}
          />
        </div>
        <div className="mt-2 w-1/4">
          <div>Category</div>
          <Select
            disabled={isLoading}
            value={formData?.categoryId}
            onValueChange={(value) => onChangeFormData({ categoryId: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="category" />
            </SelectTrigger>
            <SelectContent>
              {!!allCategory &&
                allCategory?.map((category) => (
                  <SelectGroup key={category?.id}>
                    <SelectItem value={category?.id}>
                      {category?.name}
                    </SelectItem>
                  </SelectGroup>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex mt-6 gap-x-4 ml-4">
        <div className="w-1/3">
          <div>Size</div>
          <Select
            disabled={isLoading}
            value={formData?.sizeId}
            onValueChange={(value) => onChangeFormData({ sizeId: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="size" />
            </SelectTrigger>
            <SelectContent>
              {!!allSize &&
                allSize?.map((size) => (
                  <SelectGroup key={size?.id}>
                    <SelectItem value={size?.id}>{size?.name}</SelectItem>
                  </SelectGroup>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-1/3">
          <div>Color</div>
          <Select
            disabled={isLoading}
            value={formData?.colorId}
            onValueChange={(value) => onChangeFormData({ colorId: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="size" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {!!allColor &&
                allColor?.map((color) => (
                  <SelectGroup key={color?.id} className="w-full">
                    <SelectItem value={color?.id} className="w-full">
                      <div className="flex items-center justify-between w-full">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{
                            backgroundColor: color?.value
                          }}
                        ></div>
                        <div className="text-gray-800 ml-4">{color?.name}</div>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 ml-4 flex gap-x-4">
        <div className="w-1/3">
          <div className="border border-gray-300 rounded-md p-2">
            <Checkbox
              checked={formData?.isFeatured}
              onCheckedChange={(checked: boolean) =>
                onChangeFormData({ isFeatured: checked })
              }
            />
            <span className="ml-2 text-sm text-stone-500">Featured</span>
            <div className="ml-6 text-sm text-stone-500">
              This product will appear on the home page
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="border border-gray-300 rounded-md p-2">
            <Checkbox
              checked={formData?.isArchived}
              onCheckedChange={(checked: boolean) =>
                onChangeFormData({ isArchived: checked })
              }
            />
            <span className="ml-2 text-sm text-stone-500">Archived</span>
            <div className="ml-6 text-sm text-stone-500">
              This product will not appear anywhere in the store
            </div>
          </div>
        </div>
      </div>

      <div>
        {errorMessage?.length !== 0 && (
          <div>
            {errorMessage?.map((item) => (
              <div className="text-red-500 ml-4 mt-1" key={item}>
                *{item}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-x-4 mt-4">
        <Button
          disabled={isLoading}
          className="ml-4 mb-8"
          variant={"primary"}
          onClick={() => handleSubmit()}
        >
          {action}
        </Button>
        <Button
          disabled={isLoading}
          variant={"secondary"}
          className="w-[100px]"
          onClick={() => {
            setFormData({})
            setImageUrl([])
          }}
        >
          clear
        </Button>
      </div>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </>
  )
}

export default ProductForm
