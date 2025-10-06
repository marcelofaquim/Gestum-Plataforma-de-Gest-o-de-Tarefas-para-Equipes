import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // remove token
        navigate("/");// redireciona para o login
    };

    return (
        <nav className="bg-green-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold">Gestum</h1>
            <button 
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >        
            Sair
           </button> 
         </nav>  

    );
}

export default Navbar;