import { useEffect, useState } from "react";
import axios from "axios";


function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    //Função irá buscar as tarefas
    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get("http://localhost:5000/api/tasks", {
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            });

            setTasks(res.data);
        } catch (error) {
            console.error("Erro ao carregar tarefas:", error);
            alert("Erro ao carregar tarefas. Verifique se esta logado. ");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Carregando suas tarefas...</p>
    }


    return (
        <div className="min-h-screen bg-gray-100 p-6">

        <h1 className="text-3xl font-bold text-green-600 mb-6">
            Minhas Tarefas ✅
        </h1>

        {tasks.length === 0 ? (
            <p className="text-center text-gray-600">Nenhuma tarefa encontrada.</p>
        ): (
            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        className="p-4 bg-white rounded-lg shadow-md flex justify-between"
                        >

                            <span>{task.title}</span>

                            <span
                                className={`${
                                    task.completed ? "text-green-600" : "text-red-600"
                                }font-semibold`}
                            >

                                {task.completed ? "COncluida" : "Pendente"}  
                              </span>  
                            </li>   
                ))}
            </ul>
        )}

      </div>  
    );

}  

    

export default Dashboard;