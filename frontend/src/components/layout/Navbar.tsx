import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          📊 Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Welcome to AI Bill Processing System
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="font-semibold">
            Ahmad Amliwala
          </p>

          <p className="text-sm text-gray-500">
            Owner
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          A
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
