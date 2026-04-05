type HeaderProps = {
  onToggleMenu: () => void;
};

export default function Header({ onToggleMenu }: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="button-primary"
            onClick={onToggleMenu}
          >
            Menu
          </button>

          <h1 className="text-xl font-bold text-gray-900">
            Nome Scuola
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <button className="button-secondary">Esci</button>
        </div>
      </div>
    </header>
  );
}