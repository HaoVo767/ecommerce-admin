import { useAuth, UserButton } from "@clerk/nextjs"
import { MainNav } from "@/components/main-nav"
import StoreSwitcher from "@/components/store-switcher"
import axios from "axios"
import { auth } from "@clerk/nextjs/server"
import { ModeToggle } from "./theme-toggle"
const Navbar = async () => {
  const { userId } = await auth()
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/store/findAll/${userId}`,
      {
        method: "GET",
      },
    )
    const stores = await response.json()
    return (
      <div className="border-b">
        <div className="flex items-center h-16">
          <div className="flex space-x-4 ml-2">
            <StoreSwitcher items={stores} />
            <MainNav />
          </div>
          <div className="flex ml-auto items-center space-x-4 mr-4">
            <div className="">
              <ModeToggle />
            </div>
            <UserButton />
          </div>
        </div>
      </div>
    )
  } catch (err) {
    console.log("err", err)
    return null
  }
}

export default Navbar
