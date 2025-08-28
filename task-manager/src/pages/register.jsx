//Tela de Cadastro

import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthLayout } from "../components";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cadastro com:", name, email, password);

};

return (
    <AuthLayout title="Criar conta">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite seu nome completo"
                    required
                    />
            </div>


            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}  
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu e-mail"
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
                    placeholder="Crie uma senha"
                    required
                   /> 
            </div>


            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hiver:bg-blue-700transition-colors"
            >
                Cadastrar
            </button>

            <p className="text-sm text-center text-gray-600">
                Já tem conta?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">Entrar</Link>

            </p>
        </form>
    </AuthLayout>
);

}