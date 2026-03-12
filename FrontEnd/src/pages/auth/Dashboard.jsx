import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaGear } from "react-icons/fa6";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">Votre profil</h1>
        <button className="text-2xl text-black hover:text-gray-700 transition-colors">
          <FaGear />
        </button>
      </div>

      <div className="w-full flex items-start gap-5 mb-8">
        <div className="w-20 h-20 shrink-0 rounded-full bg-gray-200 flex items-center justify-center shadow-sm">
          <span className="text-gray-600 font-bold text-2xl">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </span>
        </div>

        <div className="flex flex-col w-full">
          <p className="text-[17px] font-bold text-black leading-snug">
            {user?.username} ({user?.name})
          </p>
          <p className="text-sm text-gray-700 mt-0.5">
            Membre depuis{" "}
            {user?.created_at
              ? new Date(user.created_at).getFullYear()
              : "2025"}
          </p>

          <button
            onClick={handleLogout}
            className="mt-3 ml-auto w-fit text-xs font-medium text-red-600 hover:text-red-800 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md"
          >
            Déconnexion
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="font-bold text-[17px] mb-4 text-black">
            Informations du compte
          </h3>
          <ul className="space-y-2.5 text-gray-800 text-[15px]">
            <li>Pseudo : {user?.username}</li>
            <li>Email : {user?.email}</li>
            <li>Département : {user?.departement || "Non renseigné"}</li>
            <li>
              Type de pêche :{" "}
              <span className="capitalize">
                {user?.peche_type || "Non renseigné"}
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="font-bold text-[17px] mb-4 text-black">
            Ma Progression
          </h3>
          <ul className="space-y-3 text-gray-800 text-[15px]">
            <li className="flex items-center">
              <span className="mr-2">Niveau actuel :</span>
              <span className="bg-black text-white px-3 py-0.5 rounded-full font-bold text-xs shadow-sm">
                Lvl. {user?.level ?? 0}
              </span>
            </li>
            <li>Expérience : {user?.xp ?? 0} points</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
