// Middleware de autenticação para proteger rotas

import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // ✅ Caminho correto para o model do usuário

// Função que verifica se o usuário está autenticado
const authMiddleware = async (req, res, next) => {
  try {
    // Pega o token do cabeçalho da requisição
    const authHeader = req.headers.authorization;

    // Verifica se o token foi enviado
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido." });
    }

    // Extrai o token da string "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verifica o token usando o segredo do JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Busca o usuário no banco de dados usando o ID do token
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Armazena os dados do usuário na requisição
    req.user = user;

    // Continua para a próxima função (controller)
    next();
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error.message);
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
};

export default authMiddleware;
