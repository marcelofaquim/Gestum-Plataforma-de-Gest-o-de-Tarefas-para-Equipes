import mongoose from "mongoose";

// Estrutura (schema) de cada tarefa
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "O título é obrigatório"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "A descrição é obrigatória"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // relacionamento com o usuário dono da tarefa
      required: true,
    },
  },
  {
    timestamps: true, // cria campos createdAt e updatedAt automaticamente
  },

  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pendente", "Em Andamento", "Concluída"],
      default: "Pendente",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }

);

// Exporta o modelo
export default mongoose.model("Task", taskSchema);
