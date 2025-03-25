"use client"

import { IBillboard } from "@/interface/store"
import { useState } from "react"
import { z } from "zod"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import Heading from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { AlertModal } from "@/components/modals/alert-modal"
import { useHandleSubmit } from "@/hooks/use-handleSubmit"
import ImageUpload from "./image-upload"
interface IBillboardFormProps {
  initialData: IBillboard | null
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
})
type BillboardFormValues = z.infer<typeof formSchema>

const BillboardForm: React.FC<IBillboardFormProps> = ({ initialData }) => {
  const router = useRouter()
  const { storeId } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [billboardName, setBillboardName] = useState<string>(
    () => initialData?.label || "",
  )
  const { isSubmit, onSubmit } = useHandleSubmit()

  const title = initialData ? "Edit Billboard" : "Create Billboard"
  const description = initialData ? "Edit Billboard" : "Add new Billboard"

  const action = initialData ? "Save changes" : "Create"

  const handleSubmit = async () => {
    onSubmit()
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/billboard/${initialData?.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      )
      setIsOpen(false)
      router.refresh()
      router.push(`/${storeId}/billboard`)
      toast.success("Store deleted", { position: "top-center" })
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
      {/* <Form {...form}>
        <form
          className="space-y-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="ml-4">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 text-semibold">
                    Background image
                  </FormLabel>
                  <FormControl>
                    <ImageUpload
                      isSubmit={isSubmit}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div> */}
      <ImageUpload
        initialData={initialData}
        billBoardName={billboardName}
        storeId={typeof storeId === "string" ? storeId : null}
      />

      <div className="mt-2 ml-4">Label</div>
      <Input
        className="ml-4 mt-4"
        disabled={isLoading}
        placeholder="Billboard label"
        value={billboardName}
        onChange={(e) => setBillboardName(e.target.value)}
      />
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

export default BillboardForm
