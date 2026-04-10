import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <button
        onClick={() => navigate("/")}
        className="text-white font-bold text-lg"
      >
        Event<span className="text-indigo-400">Near</span>
      </button>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/discover")}
          className="text-gray-400 hover:text-white text-sm transition"
        >
          💎 Discover
        </button>

        {user ? (
          <>
            <button
              onClick={() => navigate("/saved")}
              className="text-gray-400 hover:text-white text-sm transition"
            >
              Saved Events
            </button>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400 text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-3 py-1.5 rounded-lg transition"
            >
              Log out
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}