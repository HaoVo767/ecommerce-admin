import { create } from "zustand"

interface ISubmit {
  isSubmit: boolean
  onSubmit: () => void
  onAfterSubmit: () => void
}

export const useHandleSubmit = create<ISubmit>((set) => ({
  isSubmit: false,
  onSubmit: () => set({ isSubmit: true }),
  onAfterSubmit: () => set({ isSubmit: false }),
}))
