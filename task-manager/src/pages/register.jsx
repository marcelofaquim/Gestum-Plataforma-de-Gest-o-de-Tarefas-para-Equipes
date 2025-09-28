// Tela de Cadastro

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Função chamada ao enviar o formulário
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Chamada para a API de registro
      const res = await axios.post("http://127.0.0.1:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Usuário registrado com sucesso! Agora faça o login.");
      console.log("Registro bem-sucedido: ", res.data);

      navigate("/"); // Redireciona para a página de login

    } catch (error) {
      console.error("Erro ao registrar o usuário: ", error );

      if (error.response) {
        console.error("Resposta da API: ", error.response.data);
        alert("Erro ao resgistrar: " + (error.response.data.message || JSON.stringify(error.response.data)));
      }else if (error.request) {
        console.error("Nenhuma resposta do servidor:", error.request);
      alert("Erro: API não respondeu. Verifique se o servidor está rodando.");
    } else {
      // Erro na configuração da requisição
      console.error("Erro na configuração:", error.message);
      alert("Erro inesperado: " + error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-600">
          Gestum - Cadastro
        </h1>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Cadastrar-se
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Já tem uma conta?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
