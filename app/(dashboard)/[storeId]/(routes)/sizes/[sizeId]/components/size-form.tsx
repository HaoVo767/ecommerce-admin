"use client"

import { ISize } from "@/interface/store"
import { useState } from "react"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useParams, useRouter } from "next/navigation"
import Heading from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { AlertModal } from "@/components/modals/alert-modal"
interface ISizeFormProps {
  initialData: ISize | null
}

const SizeForm: React.FC<ISizeFormProps> = ({ initialData }) => {
  const router = useRouter()
  const { storeId } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sizeName, setSizeName] = useState<string>(
    () => initialData?.name || "",
  )
  const [sizeValue, setSizeValue] = useState<string>(() => {
    return initialData?.value || ""
  })

  const [errorMessage, setErrorMessage] = useState<string[]>([])

  const title = initialData ? "Edit Size" : "Create Size"
  const description = initialData ? "Edit Size" : "Add new Size"
  const toastMessage = initialData
    ? "Size changed"
    : "Size created successfully"
  const action = initialData ? "Save changes" : "Create"

  const handleSubmit = async () => {
    if (initialData) {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/size/${initialData?.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: sizeName,
            value: sizeValue,
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
          router.push(`/${storeId}/sizes`)
          toast.success(`${toastMessage}`, {
            position: "top-center",
          })
        })
        .catch((err) => {
          console.log(err)
          toast.error("Somthing went wrong", {
            position: "top-center",
            duration: 2000,
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/size/${storeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sizeName,
          value: sizeValue,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.message)
            return
          }
          router.refresh()
          router.push(`/${storeId}/sizes`)
          toast.success(`${toastMessage}`, {
            position: "top-center",
          })
        })
        .catch((err) => {
          console.log(err)
          toast.error("Something went wrong", {
            position: "top-center",
            duration: 2000,
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/size/${initialData?.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      )
      setIsOpen(false)
      router.refresh()
      router.push(`/${storeId}/sizes`)
      toast.success("Store deleted", { position: "top-center" })
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong", {
        position: "top-center",
        duration: 2000,
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

      <div className="flex mt-4 ml-4">
        <div className="w-1/3 mr-10">
          <div className=" ">Name</div>
          <Input
            className="mt-2 w-[400px]"
            disabled={isLoading}
            placeholder="Size name"
            value={sizeName}
            onChange={(e) => {
              setSizeName(e.target.value)
              setErrorMessage([])
            }}
          />
        </div>

        <div className="w-1/3 ml-10">
          <div className="">Value</div>
          <Input
            className="mt-2 w-[400px]"
            disabled={isLoading}
            placeholder="Size value"
            value={sizeValue}
            onChange={(e) => {
              setSizeValue(e.target.value)
              setErrorMessage([])
            }}
          />
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

export default SizeForm
