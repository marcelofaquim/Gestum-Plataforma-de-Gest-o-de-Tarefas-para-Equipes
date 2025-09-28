//Importações necessarias
import { useState  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    //GUardar email e senha digitado pelo usuario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Hook do react-router-dom para redirecionar
    const navigate = useNavigate();

    //Função que será executada ao clicar em "Entrar"
    const handleLogin = async (e) =>{
        e.preventDefault(); //evita refresh da pagina

        try {
            //Faz requisição para nosso back-end
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });

            //Salva o token no LocalStorage para usar depois nas rotas protegidas
            localStorage.setItem("token", res.data.token);

            //Redireciona para o dashboard
            navigate("/dashboard");

        } catch (error) {
                alert(" Erro ao fazer login. Verifique suas credenciais!")
        }
    };

    return (
        <div className="flex-items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-9 rounded-lg shadow-md w-96">
               <h1 className="text-2l font-bold mb-6 text-center text-blue-600">Gestum - Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:right-2 focus:ring-blue-400"
                            required
                        />    
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 text-gray-600">Senha</label>
                        <input
                            type="password"
                            placeholder="Digite seu senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:right-2 focus:ring-blue-400"
                            required
                        />    
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;