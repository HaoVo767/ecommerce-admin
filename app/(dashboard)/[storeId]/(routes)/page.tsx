import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { formattedCurrency } from "@/lib/utils"
import axios from "axios"
import { redirect } from "next/navigation"

interface IStore {
  id: string
  name: string
  userId: string
  createdAt: Date
  updatedAt: Date
}
interface IDashboardPageProps {
  params: { storeId: string }
}

async function DashboardPage({
  params,
}: {
  params: Promise<{ storeId: string }>
}) {
  const { storeId } = await params
  // const store = await axios.get(`/store/${storeId}`)
  redirect(`/${storeId}/orders`)
  return (
    <div>Dashboard</div>
    // <div className="flex-col">
    //   <div className="flex-1 space-y-4 p-8 pt-6 ">
    //     <Heading title={"Dashboard"} description={"Overview of your store"} />
    //   </div>
    //   <Separator className="mx-6" />
    //   <div className="grid gap-4 grid-cols-3 mt-6">
    //     <Card className="ml-6">
    //       <CardHeader>
    //         <CardTitle className="text-md font-medium">Total revenue</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="text-2xl font-bold">
    //           {formattedCurrency.format(2000)}
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </div>
    // </div>
  )
}

export default DashboardPage
