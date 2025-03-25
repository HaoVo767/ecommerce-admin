"use client"

import { IStore } from "@/interface/store"
import { useState } from "react"
import { z } from "zod"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
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
interface ISettingsFormProps {
  initialData: IStore
}

const formSchema = z.object({
  name: z.string().min(1),
})
type SettingsFormValues = z.infer<typeof formSchema>

const SettingsForm: React.FC<ISettingsFormProps> = ({ initialData }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const headingProps = {
    title: "Settings",
    description: "Manage store preferences",
  }
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: SettingsFormValues) => {
    setIsLoading(true)

    const headers = {
      "Content-Type": "application/json",
    }
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/${initialData.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.log(err), setIsLoading(false)
      })
    router.refresh()
    toast.success("store updated", {
      position: "top-center",
    })
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/store/${initialData.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      )
      setIsOpen(false)
      router.refresh()
      router.push("/")
      toast.success("Store deleted", { position: "top-center" })
    } catch (err) {
      toast.error("Make sure you remove all products and categories first", {
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
          <Heading props={headingProps} />
        </div>
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
      </div>
      <Separator className="mt-2" />
      <Form {...form}>
        <form
          className="space-y-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-8 ml-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="ml-4"
              variant={"primary"}
            >
              Save change
            </Button>
          </div>
        </form>
      </Form>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
      <Separator />
      <ApiAlert
        title="API"
        description={`${useOrigin()}/api/${initialData.id}`}
        variant="public"
      />
    </>
  )
}

export default SettingsForm
