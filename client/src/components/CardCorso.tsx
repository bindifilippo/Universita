type CardCorsoProps = {
  id: number
  level: string
  title: string
  description: string
  buttonText: string
  status: string
  onChangeStatus: (id: number) => void
}

export default function CardCorso({
  id,
  level,
  title,
  description,
  buttonText,
  status,
  onChangeStatus,
}: CardCorsoProps) {
  let cardStyle = "bg-white border border-gray-200 shadow-md"
  let statusStyle = "bg-gray-100 text-gray-700"

  if (status === "In corso") {
    cardStyle = "bg-yellow-50 border border-yellow-200 shadow-md"
    statusStyle = "bg-yellow-100 text-yellow-800"
  } else if (status === "Completato") {
    cardStyle = "bg-green-50 border border-green-200 shadow-md"
    statusStyle = "bg-green-100 text-green-800"
  }

  return (
    <div className={`w-full max-w-sm rounded-2xl p-6 ${cardStyle}`}>
      <div className="mb-4">
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {level}
        </span>
      </div>

      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        {title}
      </h2>

      <p className="mb-6 text-sm leading-relaxed text-gray-600">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <button className="button" onClick={() => onChangeStatus(id)}>
          {buttonText}
        </button>

        <span className={`rounded-full px-3 py-2 text-xs font-medium ${statusStyle}`}>
          {status}
        </span>
      </div>
    </div>
  )
}