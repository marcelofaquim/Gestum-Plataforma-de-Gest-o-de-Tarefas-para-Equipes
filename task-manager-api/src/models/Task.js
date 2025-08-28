import mongoose from "mongoose";

//Criando regras de tarefas
const taskSchema = new mongoose.Schema(
    {
        //Titulo da tarefa
        title:{
            type: String,
            required:true,
            trim: true, //remove espaço extra
        },
        // Descrição da tarefa
        description: {
            type: String,
            default: "",
            trim: true,
        },
        // Status da tarefa
        status: {
            type: String,
            enum: ["pendente", "em progresso", "concluido"], //apenas valores validos
            default: "pendente",
        },
        //Referencia ao usuario dono da tarefa
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //Relaciona a tarefa do usuario
            required: true,
        },

        //Data de vencimento da tarefa
        dueData: {
            type: Date,
        },
    },

    {
        timestamps:true,
    }
);

//Modelo Task
const Task = mongoose.model("Task", taskSchema);

export default Task;