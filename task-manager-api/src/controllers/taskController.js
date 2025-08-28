//Importaçã do modelo de tarefas

import Task from "../models/Task.js";

//Função criada para listar todas as tarefas do usuario
export const getTasks = async (req, res) => {
    try {
        // O ID do usuarui vem pelo token passando pelo middleware
        const userId = req.user.id;

        //Busca todas as taredas no banco associados pelo usuario logado
        const tasks = await Task.find({ user: userId});

        // Retorna as tarefas encontradas
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar tarefas" });
    }
};

// Função: Criar uma nova tarefa

export const createTask = async (req, res) => {
    try {
        //Capturar os dados do corpo ela requisição vinda pelo frontend ou postman
        const { title, description } = req.body;

        // Criar uma noca tarefa associada ao usuario logado
        const newTask = new Task({
            title,
            description,
            user: req.user.id, // vincula ao usuarui autenticado
        });

        //Salva no banco de dados
        await newTask.save();

        //Retorna a tarefa criada
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar a tarefa" });
    }
};


//Função atualizar uma tarefa

export const updateTask = async (req, res) => {
    try {
        //Pega o ID da tarefa da URL
        const { id } = req.params;

        // Busca e atualiza a tarefa que pertece ao usuario logado
        const updateTask = await Task.findOneAndUpdate(
            { _id: id, user: req.user.id }, // Garante que só o dono pode atualizar
            req.body, //Os campos a serem atualizados
            { new: true } //retorna a versão atualizada
        );

        if (!updateTask) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }

        res.status(200).json(updateTask);
    } catch (err) {
        res.status(500).json({ error: "Erro de atualização de tarefas"})
    }
};

// Função Deletar tarefa

export const deleteTask = async (req, res) => {
    try {
    const { id } = req.params;

    //Busca e remove a tarefa que pertece ao usuario
    const deleteTask = await Task.findOneAndDelete({
        _id: id,
        user: req.user.id,
    });

    if (!deleteTask) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
    }

        res.status(200).json({ message: "Tarefa deletada com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar tarefa" });
    }
};