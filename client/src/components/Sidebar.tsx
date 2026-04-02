type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <aside className="w-64 min-h-screen border-r border-gray-200 bg-white p-6">
      <nav className="flex flex-col gap-4">
        <a href="#" className="text-gray-700 hover:text-black">
          Dashboard
        </a>
        <a href="#" className="text-gray-700 hover:text-black">
          Corsi
        </a>
        <a href="#" className="text-gray-700 hover:text-black">
          Studenti
        </a>
         <a href="#" className="text-gray-700 hover:text-black">
          Profilo
        </a>
      </nav>
    </aside>
  );
}