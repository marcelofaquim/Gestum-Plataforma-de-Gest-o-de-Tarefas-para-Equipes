import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log("Header recebido:", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    // Espera no formato "Bearer token_aqui"
    const token = authHeader.split(" ")[1];
    console.log("Token extraido:", token);


    // Verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded);

    // Salva o id do usuário no request
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.error("Erro no authMiddleware:", err.message);
    return res.status(401).json({ message: "Token inválido ou expirado", detail: err.message });
  }
};

export default authMiddleware;
