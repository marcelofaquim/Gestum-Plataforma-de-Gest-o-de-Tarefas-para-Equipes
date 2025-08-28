//Importação de biblioteca

import express from "express";

//Importamos o controller que terá a logica das tarefas
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";

//Criamos o roter do Express (pequeno servidor para rotas)
const router = express.Router();

//Definição de rotas

//Rota POST -> cria uma nova tarefa
//Exemplo: POST/api/task
router.post("/", createTask);

//ROTA PUT -> atualiza uma tarefa existente pelo ID
//Exemplo: PUT /api/tasks/1234
router.put("/:id", updateTask);

//Rota DELETE -> Remove a tarefa pelo ID
router.delete("/:id", deleteTask);


export default router;