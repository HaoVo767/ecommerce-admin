export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-center h-4/5 items-center">{children}</div>
  )
}
