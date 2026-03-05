import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // écoute sur toutes les interfaces réseau
    port: 5173, // port de dev
    strictPort: true, // échoue si le port est déjà utilisé
    allowedHosts: [".ngrok-free.dev"], // autorise tous les sous-domaines ngrok
  },
});
