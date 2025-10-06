import Task from "../models/taskModel.js";

// 📥 [GET] Buscar todas as tarefas do usuário logado
export const getTasks = async (req, res) => {
  try {
    const tasks = (await Task.find({ user: req.user.id })).toSorted({ createAt: -1}); // busca apenas as tarefas do usuário logado
    res.status(200).json(tasks);

    if (!task || tasks.lenght === 0) {
      return res.status(200).json([]);
    }

    //Retorna as tarefas encontradas
    res.status(200).json(tasks);

  } catch (err) {
    console.error("Erro ao buscar tarefas:", err);
    res.status(500).json({ message: "Erro ao buscar tarefas" });
  }
};

// 📤 [POST] Criar nova tarefa
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    const newTask = new Task({
      title,
      description,
      user: req.user.id, // o ID vem do token decodificado
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("Erro ao criar tarefa:", err);
    res.status(500).json({ message: "Erro ao criar tarefa" });
  }
};

// 🗑️ [DELETE] Excluir uma tarefa pelo ID
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });

    // garante que o usuário só possa excluir as próprias tarefas
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Acesso não autorizado" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Tarefa excluída com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir tarefa:", err);
    res.status(500).json({ message: "Erro ao excluir tarefa" });
  }
  
};

// ✏️ [PUT] Atualizar tarefa
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });
    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Acesso não autorizado" });

    task.title = title || task.title;
    task.description = description || task.description;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Erro ao atualizar tarefa:", err);
    res.status(500).json({ message: "Erro ao atualizar tarefa" });
  }

};

// 🌀 [PATCH] Atualizar status da tarefa
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });

    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Acesso não autorizado" });

    task.status = status;
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Erro ao atualizar status:", err);
    res.status(500).json({ message: "Erro ao atualizar status" });
  }
};


