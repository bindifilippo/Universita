export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white px-6 py-4">
      <div className="flex flex-col gap-2 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Nome Scuola. Tutti i diritti riservati.</p>

        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-900 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Termini
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Contatti
          </a>
        </div>
      </div>
    </footer>
  )
}