"use client"

import { useOrigin } from "@/hooks/use-origin"
import { useParams } from "next/navigation"
import { ApiAlert } from "./ui/api-alert"

interface IApiListProps {
  entityName: string
  entityIdName: string
}
const ApiList: React.FC<IApiListProps> = (props) => {
  const params = useParams()
  const origin = useOrigin()
  const baseUrl = `${origin}/api/${params.storeId}`
  return <ApiAlert title="GET" description={baseUrl} variant="public" />
}

export default ApiList
