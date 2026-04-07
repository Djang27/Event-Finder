import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleEmailAuth() {
    setLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <button
          onClick={() => navigate("/")}
          className="text-gray-400 hover:text-white text-sm mb-6 inline-block transition"
        >
          ← Back to EventNear
        </button>

        <h2 className="text-3xl font-bold mb-2">
          {isSignUp ? "Create account" : "Welcome back"}
        </h2>
        <p className="text-gray-400 mb-6">
          {isSignUp ? "Sign up to save your favourite events" : "Sign in to your account"}
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <div className="space-y-3 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEmailAuth()}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleEmailAuth}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition mb-3"
        >
          {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <button
          onClick={handleGoogle}
          className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold py-3 rounded-xl transition mb-6 flex items-center justify-center gap-2"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
          Continue with Google
        </button>

        <p className="text-center text-gray-400 text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-400 hover:text-indigo-300"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}