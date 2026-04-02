import type { ReactNode } from "react";
import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
        <div className="flex">
            <Sidebar isOpen={isOpen} />
            <main className="flex-1 p-6">
            <button
                className="mb-6 rounded-lg bg-gray-900 px-4 py-2 text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                Menu
            </button>
            {children}
            </main>
        </div>
      <Footer />
    </div>
  );
}