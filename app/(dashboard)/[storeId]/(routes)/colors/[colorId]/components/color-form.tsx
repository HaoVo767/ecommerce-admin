"use client"

import { IColor } from "@/interface/store"
import { useState } from "react"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useParams, useRouter } from "next/navigation"
import Heading from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { AlertModal } from "@/components/modals/alert-modal"
interface IColorFormProps {
  initialData: IColor | null
}

const ColorForm: React.FC<IColorFormProps> = ({ initialData }) => {
  const router = useRouter()
  const { storeId } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // const [isSubmit, setIsSubmit] = useState(false)
  const [colorName, setColorName] = useState<string>(
    () => initialData?.name || "",
  )
  const [colorValue, setColorValue] = useState<string>(() => {
    return initialData?.value || ""
  })
  const [errorMessage, setErrorMessage] = useState<string[]>([])
  const title = initialData ? "Edit Color" : "Create Color"
  const description = initialData ? "Edit Color" : "Add new Color"
  const toastMessage = initialData
    ? "Color changed"
    : "Color created successfully"
  const action = initialData ? "Save changes" : "Create"

  const handleSubmit = async () => {
    if (initialData) {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/color/${initialData?.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: colorName,
            value: colorValue,
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
          router.push(`/${storeId}/colors`)
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
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/color/${storeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: colorName,
          value: colorValue,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.message)
            return
          }
          router.refresh()
          router.push(`/${storeId}/colors`)
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/color/${initialData?.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      )
      setIsOpen(false)
      router.refresh()
      router.push(`/${storeId}/colors`)
      toast.success("Color deleted", { position: "top-center" })
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
          <div className=" ">Name</div>
          <Input
            className="mt-2 w-full"
            disabled={isLoading}
            placeholder="Color name"
            value={colorName}
            onChange={(e) => {
              setColorName(e.target.value)
              setErrorMessage([])
            }}
          />
        </div>

        <div className="w-1/3 ml-10">
          <div className="">Value</div>
          <div className="flex gap-x-2 mt-2">
            <Input
              className="w-full"
              disabled={isLoading}
              placeholder="#FEE, #FFEE11, ..."
              value={colorValue}
              onChange={(e) => {
                setColorValue(e.target.value)
                setErrorMessage([])
              }}
            />
            <div
              className="h-8 w-8 rounded-full border items-center border-gray-500 "
              style={{ backgroundColor: colorValue }}
            ></div>
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

export default ColorForm
