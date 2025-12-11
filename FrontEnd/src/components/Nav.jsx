import { Link } from "react-router-dom";
import { useState } from "react";

export default function Nav({ data }) {
  const fields = data || [];
  const [curentPage, setCurrentPage] = useState(window.location.pathname);

  return (
    <nav className="absolute bottom-3 left-[2%] w-[96%] m-auto bg-[#434DAB] shadow-md z-1000 rounded-xl text-white flex">
      {fields.map((field, index) => {
        const isActive = curentPage === field.url;

        if (field.url) {
          return (
            <Link
              key={index}
              to={field.url}
              onClick={() => setCurrentPage(field.url)}
              className={`flex flex-col items-center justify-center p-3 flex-1 cursor-pointer rounded-xl hover:bg-[#53A2BE] transition group ${
                curentPage === field.url ? "text-[#F8F8FF]" : ""
              }`}
            >
              <field.icon className="text-4xl group-hover:text-white" />
            </Link>
          );
        }

        return (
          <button
            key={index}
            onClick={field.action}
            className="flex flex-col items-center justify-center p-3 flex-1 cursor-pointer rounded-xl hover:bg-[#53A2BE] transition group"
          >
            <field.icon className="text-4xl text-white group-hover:text-white" />
          </button>
        );
      })}
    </nav>
  );
}
