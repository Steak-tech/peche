import React, { useState } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";

export default function Login({ setCookie }) {
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
      const data = await UserService.login({ email, password });

      setCookie(
        "auth_data",
        {
          username: data.user.username,
          token: data.token,
        },
        { path: "/" },
      );

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
        className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md w-full"
      >
        {/* Affichage des erreurs */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <label className="block mb-4">
          <p className="text-gray-700 font-semibold mb-1">Email</p>
          <input
            type="email"
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
          />
        </label>

        <label className="block mb-4">
          <p className="text-gray-700 font-semibold mb-1">Mot de passe</p>
          <input
            type="password"
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </label>

        <div className="flex justify-between items-center mb-6">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Mot de passe oublié ?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white font-bold transition duration-200 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
