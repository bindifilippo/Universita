import type { ReactNode } from "react";
import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  //controlla stato visibilità sidebar
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onToggleMenu={handleToggleMenu} />

      <div className="flex">
        <Sidebar isOpen={isOpen} />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}