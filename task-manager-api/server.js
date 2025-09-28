// Importação de bibliotecas
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//Importação de arq
import authMiddleware from "./src/middlewares/authMiddleware.js";
import taskRoutes from "./src/routes/taskRoutes.js"

// Importa as rotas de autenticação
import authRoutes from "./src/routes/authRoutes.js";

// // Todas as rotas de api/tasks que exigem token
// app.use("/api/tasks", authMiddleware, taskRoutes)

// Configuração DOTENV para ler as variáveis do ambiente
dotenv.config();

// Criando o servidor
const app = express();

// Configurações básicas
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
})); // permite o acesso de outros domínios
app.use(express.json()); // permite receber JSON no body

// Rotas
app.use("/api/auth", authRoutes);

//Rotas de tarefas (protegidas por middleware)
app.use("/api/tasks", taskRoutes);

// Rota inicial para teste
app.get("/", (req, res) => {
    res.send("API do Task Manager rodando 🚀");
});

// Conectando ao banco e iniciando o servidor
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Conectado ao MongoDB");
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    })
    .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));
