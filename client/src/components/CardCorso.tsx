type CardCorsoProps = {
  level: string
  title: string
  description: string
  buttonText: string
}

export default function CardCorso ({level, title, description, buttonText}:CardCorsoProps){
    return (
        <>
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

                <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700">
                {buttonText}
                </button>
            </div>
        </>
    )
}

