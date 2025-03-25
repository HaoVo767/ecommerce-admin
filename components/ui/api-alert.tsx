import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Copy, Server } from "lucide-react"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ApiAlertProps {
  title: string
  description: string
  variant: "public" | "admin"
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
}
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
}

export const ApiAlert: React.FC<ApiAlertProps> = ({ ...props }) => {
  const { title, description, variant } = props
  const handleCopy = async () => {
    await navigator.clipboard.writeText(description)
    toast.success("Api has been copied to clipboard", {
      position: "top-center",
    })
  }
  return (
    <Alert>
      <Server />
      <div className="flex mt-2">
        <AlertTitle className="font-bold ml-2">{title}</AlertTitle>
        <Badge
          variant={variantMap[variant]}
          className="ml-2 relative bottom-0.5 font-semibold"
        >
          {textMap[variant]}
        </Badge>
      </div>
      <AlertDescription className="ml-4 mt-1">
        <code className="rounded font-mono font-semibold bg-muted text-sm">
          {description}
        </code>
        <Button
          className="float-right relative bottom-4"
          variant={"outline"}
          size={"icon"}
          onClick={handleCopy}
        >
          <Copy />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
