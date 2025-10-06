import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "" });
  const token = localStorage.getItem("token");

  // 🔹 Buscar tarefas do backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔹 Criar nova tarefa
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return alert("Preencha todos os campos!");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data]);
      setForm({ title: "", description: "" });
    } catch (err) {
      alert("Erro ao criar tarefa.", err);
    }
  };

  // 🔹 Atualizar status
  const handleStatusChange = async (task, newStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/tasks/${task._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      alert("Erro ao atualizar status da tarefa.", err);
    }
  };

  // 🔹 Excluir tarefa
  const handleDelete = async (id) => {
    if (!confirm("Deseja excluir esta tarefa?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch {
      alert("Erro ao excluir tarefa.");
    }
  };

  // 🔹 Separar por status
  const columns = {
    Pendente: tasks.filter((t) => t.status === "Pendente"),
    "Em Andamento": tasks.filter((t) => t.status === "Em Andamento"),
    Concluída: tasks.filter((t) => t.status === "Concluída"),
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Painel de Tarefas
        </h1>

        {/* Criar nova tarefa */}
        <form onSubmit={handleCreate} className="flex gap-2 mb-8 justify-center">
          <input
            type="text"
            placeholder="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-2 border rounded w-60"
          />
          <input
            type="text"
            placeholder="Descrição"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-2 border rounded w-80"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Criar
          </button>
        </form>

        {/* Colunas estilo Trello */}
        {loading ? (
          <p className="text-gray-500 text-center">Carregando tarefas...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {Object.entries(columns).map(([status, tasks]) => (
              <div key={status} className="bg-white p-4 rounded-xl shadow">
                <h2
                  className={`text-xl font-semibold mb-3 text-center ${
                    status === "Pendente"
                      ? "text-red-600"
                      : status === "Em Andamento"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {status}
                </h2>

                {tasks.length === 0 ? (
                  <p className="text-gray-400 text-center">Sem tarefas</p>
                ) : (
                  tasks.map((task) => (
                    <div
                      key={task._id}
                      className="border rounded-lg p-3 mb-3 bg-gray-50 shadow-sm"
                    >
                      <h3 className="font-bold text-gray-800">{task.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{task.description}</p>

                      <div className="flex justify-between items-center mt-2">
                        {/* Botões de mudança de status */}
                        <select
                          value={task.status}
                          onChange={(e) => handleStatusChange(task, e.target.value)}
                          className="text-sm border rounded p-1"
                        >
                          <option>Pendente</option>
                          <option>Em Andamento</option>
                          <option>Concluída</option>
                        </select>

                        <button
                          onClick={() => handleDelete(task._id)}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
