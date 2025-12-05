import Nav from "./Nav";
import { IoMdHome } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Nav data={[{icon: IoMdHome, url:'/'}, {icon: IoAddCircle, url:'/sortie'}, {icon: FaUserCircle, url:'/user' }]} />
      <main className="w-[100vw] h-[100vh] box-border">
        <Outlet />
      </main>
    </>
  );
}
