"use client"

import { DialogDescription } from "@radix-ui/react-dialog"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FC } from "react"
import { Button } from "./button"

interface ModalProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
}

export default function Modal({
  children,
  ...props
}: {
  // props: ModalProps
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}) {
  const { title, description, isOpen, onClose } = props
  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="text-sm text-stone-600">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div>{children}</div>

          {/* <DialogFooter className="sm:justify-start">
            <div className="flex justify-around">
              <div>
                {closeButton && (
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                )}
              </div>
              <div>
                {okButton && (
                  <Button variant={"primary"} type="submit">
                    {okButton}
                  </Button>
                )}
              </div>
            </div>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  )
}
