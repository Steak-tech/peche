import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Nav({ data }) {
    const fields = data || [];
    const [curentPage, setCurrentPage] = useState(window.location.pathname);
    console.log(curentPage);
    

    return (
        <nav className="absolute bottom-3 left-[2%] w-[96%] m-auto bg-[#434DAB] shadow-md z-10000 rounded-lg text-white flex">
            {fields.map((field, index) => (
                <Link key={index} to={field.url} onClick={() => setCurrentPage(field.url)} className={`flex flex-col items-center justify-center p-2 flex-1 cursor-pointer hover:bg-[#2C3187] transition ${curentPage === field.url ? 'text-[#97A1FF]' : ''}`}>
                    {field.icon ? <field.icon className="text-3xl" /> : <IoMdHome />}
                    <strong>{field.label}</strong> {field.name}
                </Link>
            ))}
        </nav>
    );
}