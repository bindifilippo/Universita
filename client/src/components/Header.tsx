export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">
          Nome Scuola
        </h1>

        <div className="flex items-center gap-6">
          <button className="button">
            Esci
          </button>
        </div>
      </div>
    </header>
  )
}