import { useState } from "react";
import Nav from "./Nav";
import { IoMdHome, IoMdClose, IoIosArrowForward } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import FishCommonsModal from "./commons/FishCommonsModal";
import { useAuth } from "../context/AuthContext.jsx";

export default function Layout({ cookies, removeCookie }) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { icon: IoMdHome, url: "/" },
    {
      icon: IoAddCircle,
      action: () => {
        if (!isAuthenticated) {
          navigate("/login");
        } else {
          navigate("/");
          setOpenModal(true);
        }
      },
    },
    isAuthenticated
      ? { icon: FaUserCircle, url: "/dashboard" }
      : { icon: FaUserCircle, url: "/login" },
  ];

  return (
    <>
      <Nav data={navItems} />

      <main className="w-[100vw] h-[100vh] box-border">
        <Outlet />
      </main>

      <FishCommonsModal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Ajouter une sortie</h2>
          <button onClick={() => setOpenModal(false)}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <IoIosArrowForward />
            <a href="" className="py-2">
              Enregistrer une sortie
            </a>
          </div>
          <hr />
          <div className="flex items-center gap-2 cursor-pointer">
            <IoIosArrowForward />
            <a href="/sortie" className="py-2">
              Créer une sortie
            </a>
          </div>
        </div>
      </FishCommonsModal>
    </>
  );
}
