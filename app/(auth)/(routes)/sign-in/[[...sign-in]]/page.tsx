"use client"

import { SignIn, useAuth } from "@clerk/nextjs"
export default function Page() {
  const { isSignedIn } = useAuth()
  if (!isSignedIn) {
    return <SignIn />
  }
}
