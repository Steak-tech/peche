import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  return (
    <div>
      Coucou
      {isAuthenticated ? (
        <div style={{ background: "lightgreen", padding: "10px" }}>
          ✅ Connecté avec succès ! Bonjour {user?.email}{" "}
          {/* ou user?.name selon ton API */}
        </div>
      ) : (
        <div style={{ background: "lightcoral", padding: "10px" }}>
          ❌ Non connecté.
        </div>
      )}
    </div>
  );
};

export default Dashboard;
