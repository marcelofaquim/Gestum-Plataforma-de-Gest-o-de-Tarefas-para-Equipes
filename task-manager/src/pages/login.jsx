//Page de login

import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthLayout } from "../components";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



//função de envio (não foi feito a integração com o back-end)
const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login com:",email, password);

};


return (
    <AuthLayout title="Entrar na Plataforma">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">E-mail</label>
                <input
                    type="email"
                    className="mt-l w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-nome focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                    />
            </div>


            <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Entrar
                </button>

                <p className="text-sm text-center text-gray-600">
                        Não tem uma conta?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">Cadastra-se</Link>

                </p>
        </form>
    </AuthLayout>
);
}





//useState → armazena valores digitados nos campos.

