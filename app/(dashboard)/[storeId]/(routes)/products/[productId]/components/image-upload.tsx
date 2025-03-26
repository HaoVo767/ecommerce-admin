// "use client"

// import Image from "next/image"
// import { ImagePlus, Trash } from "lucide-react"
// import { CldUploadWidget } from "next-cloudinary"
// import { placeholderSvg } from "@/public/image/placeholderImage"
// import { IProduct } from "@/interface/store"
// import { Button } from "@/components/ui/button"
// import { useHandleSubmit } from "@/hooks/use-handleSubmit"
// import { useEffect, useState } from "react"
// import { toast } from "sonner"
// import { useRouter } from "next/navigation"
// import { useLoading } from "@/hooks/use-loading"

// interface IImageUploadProps {
//   disable?: boolean
//   onChange: (value: string) => void
//   onRemove: (value: string) => void
//   values: string[]
// }
// interface IImageUploadProps2 {
//   billBoardName: string
//   initialData: IProduct | null
//   storeId: string | null
// }
// const ImageUpload: React.FC<IImageUploadProps2> = ({
//   initialData,
//   billBoardName,
//   storeId
// }) => {
//   const [isMounted, setIsMounted] = useState(false)
//   const [imageUrl, setImageUrl] = useState<string[]>(
//     () => initialData?.image || [""]
//   )
//   const { isSubmit, onAfterSubmit } = useHandleSubmit()
//   const router = useRouter()
//   const { isLoading, onFetch, onFinish } = useLoading()
//   const toastMessage = initialData ? "Billboard updated" : "Billboard created"
//   useEffect(() => {
//     if (isSubmit) {
//       onFetch()
//       const handleSubmit = async () => {
//         const headers = {
//           "Content-Type": "application/json"
//         }
//         if (initialData) {
//           await fetch(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/billboard/${initialData?.id}`,
//             {
//               method: "PATCH",
//               headers,
//               body: JSON.stringify({
//                 imageUrl,
//                 label: billBoardName
//               })
//             }
//           )
//             .then((response) => response.json())
//             .then(() => onFetch())
//             .catch((err) => {
//               console.log(err), onFetch()
//               toast.error("Somthing went wrong", {
//                 position: "top-center"
//               })
//             })
//         } else {
//           await fetch(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/billboard/${storeId}`,
//             {
//               method: "POST",
//               headers,
//               body: JSON.stringify({
//                 imageUrl,
//                 label: billBoardName
//               })
//             }
//           )
//             .then((response) => response.json())
//             .then((data) => {
//               router.push(`/${storeId}/billboard/${data?.id}`)
//               onFetch()
//             })
//             .catch((err) => {
//               console.log(err), onFetch()
//               toast.error("Something went wrong", {
//                 position: "top-center"
//               })
//             })
//         }
//         router.refresh()
//         router.push(`/${storeId}/billboard`)
//         toast.success(`${toastMessage}`, {
//           position: "top-center"
//         })
//       }
//       handleSubmit()
//       const submitDone = () => {
//         onAfterSubmit()
//       }
//       submitDone()
//       onFinish()
//     }
//   }, [isSubmit])
//   useEffect(() => {
//     setIsMounted(true)
//   }, [])

//   if (!isMounted) {
//     return null
//   }
//   const handleRemoveImage = () => {
//     setImageUrl("")
//   }
//   return (
//     <>
//       <div className="mb-4 flex items-center gap-4">
//         {imageUrl !== "" && (
//           <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
//             <div className="z-10 absolute top-2 right-2">
//               <Button
//                 variant={"destructive"}
//                 className="absolute top-2 right-2"
//                 size={"icon"}
//                 onClick={handleRemoveImage}
//                 // disabled={isLoading}
//               >
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>

//             <Image
//               src={imageUrl !== "" ? imageUrl : placeholderSvg}
//               alt="image"
//               className="object-cover"
//               width={300}
//               height={300}
//             />
//           </div>
//         )}
//         {/* ))} */}
//       </div>
//       <CldUploadWidget
//         uploadPreset="preset_1"
//         onSuccess={(result) => {
//           setImageUrl((prev) => {
//             return typeof result.info !== "string" && result.info?.url
//               ? [...prev, result.info?.url]
//               : prev
//           })
//           //   setImageUrl(
//           //     typeof result.info !== "string" && result.info?.url
//           //       ? result.info?.url
//           //       : "",
//           //   )
//         }}
//       >
//         {({ open }) => {
//           const onClick = () => {
//             open()
//           }
//           return (
//             <div>
//               {imageUrl === "" && (
//                 <Button
//                   type="button"
//                   // disabled={disable}
//                   variant={"secondary"}
//                   onClick={onClick}
//                 >
//                   <ImagePlus className="h-4 w-4" />
//                   Upload an image
//                 </Button>
//               )}
//             </div>
//           )
//         }}
//       </CldUploadWidget>
//     </>
//   )
// }

// export default ImageUpload
