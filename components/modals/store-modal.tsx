"use client"
import { z } from "zod"
import Modal from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@clerk/nextjs"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { headers } from "next/headers"

const formSchema = z.object({
  name: z.string().min(1).max(50, {
    message: "product name must have at least 1 character",
  }),
})
export default function StoreModal() {
  const storeModal = useStoreModal()
  const [loading, setLoading] = useState(false)
  const { userId } = useAuth()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
      const newStore = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/store`,
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            name: values.name,
            userId,
          }),
        },
      )
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.log(err))
      toast.success(`created store name: ${newStore?.name}`, {
        position: "top-center",
      })
      setLoading(false)
      router.push(`/${newStore?.id}`)
      storeModal.onClose()
    } catch (err) {
      console.log("error", err)
      setLoading(false)
      toast.error("failed to create store", {
        position: "top-center",
      })
    } finally {
      if (typeof window !== "undefined") {
        window.location.reload()
      }
    }
  }
  // const modalProps = {
  //   title: "Create store",
  //   description: "add a new store to manage products",
  //   isOpen: storeModal.isOpen,
  //   onClose: storeModal.onClose,
  // closeButton: true,
  // okButton: "Continue",
  // }

  return (
    <Modal
      title="Create store"
      description="add a new store to manage products"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 p-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="e-commerce"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 flex justify-end space-x-2">
              <Button
                variant={"outline"}
                onClick={() => storeModal.onClose()}
                disabled={loading}
                type="reset"
              >
                Cancel
              </Button>
              <Button variant={"primary"} type="submit" disabled={loading}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}
