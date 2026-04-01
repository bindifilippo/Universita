type CardCorsoProps = {
    id: number
    level: string
    title: string
    description: string
    buttonText: string
    status: string
    onChangeStatus: (id: number) => void
}

export default function CardCorso ({id, level, title, description, buttonText, status, onChangeStatus}:CardCorsoProps){
    return (   
        <div className="cardCorso">
            <div className="mb-4">
                <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {level}
                </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {description}
            </p>

           <div className="flex items-center justify-between">
                <button className="button" onClick={() => onChangeStatus(id)}>
                {buttonText}
                </button>

                <span className="rounded-full bg-blue-100 px-3 py-2 text-xs font-medium">
                {status}
                </span>
            </div>
        </div>
    )
}

