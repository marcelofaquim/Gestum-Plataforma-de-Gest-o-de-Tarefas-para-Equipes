import express from "express";
import { getTasks, createTask, deleteTask, updateTask, updateTaskStatus,} from "../controllers/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Todas as rotas de tarefas exigem autenticação
router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.patch("/:id/status", authMiddleware, updateTaskStatus);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
