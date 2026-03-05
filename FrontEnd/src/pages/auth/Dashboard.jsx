import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Mon Tableau de bord
            </h1>

            {/* Le fameux bouton de déconnexion */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Se déconnecter
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Bienvenue, {user?.name} !
            </h2>
            <p className="text-gray-600 mb-4">Voici tes informations :</p>

            <ul className="bg-gray-50 p-4 rounded border">
              <li>
                <strong>Email :</strong> {user?.email}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
