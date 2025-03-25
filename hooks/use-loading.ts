import { create } from "zustand"

interface ILoadingProps {
  isLoading: boolean
  onFetch: () => void
  onFinish: () => void
}

export const useLoading = create<ILoadingProps>((set) => ({
  isLoading: false,
  onFetch: () => set({ isLoading: true }),
  onFinish: () => set({ isLoading: false }),
}))
