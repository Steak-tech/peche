import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";

const Register = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    departement: "",
    peche_type: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register(formData);
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {/* Barre de progression simple */}
        <p className="text-sm text-gray-500 mb-4 text-center">
          Étape {step} sur 3
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form
          onSubmit={
            step === 3
              ? handleSubmit
              : (e) => {
                  e.preventDefault();
                  nextStep();
                }
          }
        >
          {/* ÉTAPE 1 : Infos de base */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">
                Créer un compte
              </h2>
              {/* Tes inputs de base ici : Name, Username, Email, Password... */}
              {/* ... (je raccourcis pour la lisibilité) ... */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom"
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nom d'utilisateur"
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirmer le mot de passe"
                className="w-full p-2 border rounded mb-4"
                required
              />

              <button
                type="button"
                onClick={nextStep}
                className="w-full py-2 px-4 rounded text-white font-bold bg-blue-600 hover:bg-blue-700"
              >
                Suivant
              </button>
            </>
          )}

          {/* ÉTAPE 2 : Département */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">
                Dans quel département pêches-tu ?
              </h2>
              <input
                type="text"
                name="departement"
                value={formData.departement}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                placeholder="Ex: 59, 75, Gironde..."
                required
              />

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 font-bold"
                >
                  Retour
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-2 px-4 rounded text-white font-bold bg-blue-600 hover:bg-blue-700"
                >
                  Suivant
                </button>
              </div>
            </>
          )}

          {/* ÉTAPE 3 : Type de pêche & Validation finale */}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">
                Quel est ton type de pêche ?
              </h2>
              <select
                name="peche_type"
                value={formData.peche_type}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none mb-6"
                required
              >
                <option value="">Sélectionne un type</option>
                <option value="Etang">Étang</option>
                <option value="Rivière">Rivière</option>
                <option value="Sous-marine">Sous-marine</option>
                <option value="Mer">Mer</option>
              </select>

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 font-bold"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 px-4 rounded text-white font-bold ${loading ? "bg-blue-400" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {loading ? "Création..." : "Terminer"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
