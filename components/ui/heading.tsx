interface IHeadingProps {
  title: string
  description: string
}
const Heading = ({ ...props }: any) => {
  const { title, description } = props
  return (
    <>
      <div className="text-2xl font-bold tracking-tight">{title}</div>
      <p className="text-sm font-light text-gray-600">{description}</p>
    </>
  )
}

export default Heading
