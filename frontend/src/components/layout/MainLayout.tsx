import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <Outlet />
      </main>

      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-gray-500">
          © 2026 FindRetalroom. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
