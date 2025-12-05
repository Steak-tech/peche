export default function Nav({ data }) {
    const fields = data || [];
    return (
        <nav className="absolute bottom-3 left-[2%] w-[96%] m-auto bg-[#434DAB] shadow-md z-1000 rounded-md text-white flex">
            {fields.map((field, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-2 flex-1 ">
                    {field.icon ? <field.icon className="text-2xl" /> : <IoMdHome />}
                    <strong>{field.label}</strong> {field.name}
                </div>
            ))}
        </nav>
    );
}