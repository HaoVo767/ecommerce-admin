"use client"

import { IBillboard, ICategories } from "@/interface/store"
import { useState } from "react"
import { z } from "zod"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import Heading from "@/components/ui/heading"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { AlertModal } from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { useOrigin } from "@/hooks/use-origin"
import { useHandleSubmit } from "@/hooks/use-handleSubmit"
import ImageUpload from "./image-upload"
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select"

interface ICategoryFormProps {
  initialData: ICategories | null
  allBillboard: IBillboard[] | null
}

const formSchema = z.object({
  name: z.string().min(1),
})
type CategoryFormValues = z.infer<typeof formSchema>

const CategoryForm: React.FC<ICategoryFormProps> = ({
  initialData,
  allBillboard,
}) => {
  const router = useRouter()
  const { storeId, billboardId, categoryId } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [categoryName, setCategoryName] = useState<string>(
    () => initialData?.name || "",
  )
  const [selectValue, setSelectValue] = useState<string>(
    () => initialData?.billboardId || "",
  )
  const [errorMessage, setErrorMessage] = useState<string[]>([])
  const title = initialData ? "Edit Category" : "Create Category"
  const description = initialData ? "Edit Category" : "Add new Category"
  const toastMessage = initialData
    ? "Category changed"
    : "Category created successfully"
  const action = initialData ? "Save changes" : "Create"

  const handleSubmit = async () => {
    if (initialData) {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/category/${initialData?.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            billboardId: selectValue,
            name: categoryName,
          }),
        },
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.message)
            return
          }
          router.refresh()
          router.push(`/${storeId}/categories`)
          toast.success(`${toastMessage}`, {
            position: "top-center",
          })
        })
        .catch((err) => {
          console.log(err)
          toast.error("Somthing went wrong", {
            position: "top-center",
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/${storeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billboardId: selectValue,
          name: categoryName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.message)
            return
          }
          router.refresh()
          router.push(`/${storeId}/categories`)
          toast.success(`${toastMessage}`, {
            position: "top-center",
          })
        })
        .catch((err) => {
          console.log(err)
          toast.error("Something went wrong", {
            position: "top-center",
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/category/${categoryId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      )
      setIsOpen(false)
      router.refresh()
      router.push(`/${storeId}/categories`)
      toast.success("Category deleted", { position: "top-center" })
    } catch (err) {
      toast.error("Something went wrong", {
        position: "top-center",
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
      <div className="flex mt-4 ml-4 gap-x-4">
        <div className="w-1/3">
          <div className="mr-4">Name</div>
          <Input
            className="w-full"
            disabled={isLoading}
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value)
              setErrorMessage([])
            }}
          />
        </div>

        <div className="ml-4 w-1/3">
          <div className="">Billboard</div>
          <Select
            disabled={isLoading}
            value={selectValue}
            onValueChange={(value) => setSelectValue(value)}
          >
            <SelectTrigger className="w-">
              <SelectValue placeholder="billboard" />
            </SelectTrigger>
            <SelectContent>
              {!!allBillboard &&
                allBillboard?.map((billboard) => (
                  <SelectGroup key={billboard?.id}>
                    <SelectItem value={billboard?.id}>
                      {billboard?.label}
                    </SelectItem>
                  </SelectGroup>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        {errorMessage.length !== 0 && (
          <div>
            {errorMessage.map((item) => (
              <div className="text-red-500 ml-4 mt-1" key={item}>
                *{item}
              </div>
            ))}
          </div>
        )}
      </div>
      <Button
        disabled={isLoading}
        className="ml-4 mb-8 mt-4"
        variant={"primary"}
        onClick={() => handleSubmit()}
      >
        {action}
      </Button>

      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </>
  )
}

export default CategoryForm
