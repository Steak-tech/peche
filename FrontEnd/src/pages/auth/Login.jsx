import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });

      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Une erreur est survenue lors de la connexion.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-center mt-8">Connexion</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-6 rounded  w-full"
      >
        {/* Affichage des erreurs */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <label className="block mb-4">
          <p className="text-gray-700 p-2 font-light mb-1">Email</p>
          <input
            type="email"
            required
            className="w-full p-2 rounded-2xl border border-[#434DAB]/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
          />
        </label>

        <label className="block mb-4">
          <p className="text-gray-700 p-2 font-light mb-1">Mot de passe</p>
          <input
            type="password"
            required
            className="w-full p-2 rounded-2xl border border-[#434DAB]/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </label>

        <div className="flex justify-end items-center mb-6">
          <a href="#" className="text-sm text-gray-700 font-light hover:underline">
            Mot de passe oublié ?
          </a>
        </div>

        <div className="text-center mb-4 py-6 pt-6">
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white font-light rounded-2xl transition duration-200 ${
            loading
              ? "bg-[#434DAB] cursor-not-allowed"
              : "bg-[#434DAB] hover:bg-[#3a449c]"
          }`}
        >
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>
        </div>

        <div className="flex justify-center items-center mb-6">
          <a href="#" className="inline-flex items-center gap-2 text-normal text-gray-700 font-light hover:underline">
            Se connecter avec Google <FaGoogle/>
          </a>
        </div>

        <div className="flex justify-center items-center mb-6">
          <p className="text-sm text-gray-700 p-2 font-light mb-1">Pas encore de compte ?</p><a href="#" className="text-sm text-gray-700 font-semibold hover:underline mb-1">
            S'inscrire
          </a>
        </div>


      </form>
    </div>
  );
}
