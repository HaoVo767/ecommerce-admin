"use client"

import { useState, useEffect } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) return null
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
