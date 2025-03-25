"use client"

import React, { useEffect, useState } from "react"
import Modal from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
}
export const AlertModal: React.FC<AlertModalProps> = (props) => {
  const { isOpen, onClose, onConfirm, isLoading } = props
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  // const modalProps = {
  //   title: "Are you sure",
  //   description: "This action can not undone",
  // isOpen,
  // onClose,
  // }
  return (
    <Modal
      title="Are you sure"
      description="This action can not undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex justify-end">
        <Button
          className="mr-4"
          disabled={isLoading}
          variant={"outline"}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button disabled={isLoading} variant={"primary"} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  )
}
