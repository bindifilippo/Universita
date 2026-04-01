export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">
          Nome Scuola
        </h1>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
            Accedi
          </button>

          <button className="button button:hover">
            Registrati
          </button>
        </div>
      </div>
    </header>
  )
}