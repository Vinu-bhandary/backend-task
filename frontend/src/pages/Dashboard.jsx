import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const { logout, role } = useContext(AuthContext);

    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
    });
    const [editWindow, setEditWindow] = useState(null);
    const [deleteWindow, setDeleteWindow] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const fetchTasks = async () => {
        const res = await api.get("tasks/");
        setTasks(res.data);
    };

    useEffect(() => async () => {
        fetchTasks();
    }, []);

    const createTask = async () => {
        if (!form.title || !form.description) return;
        await api.post("tasks/", form);
        setForm({ title: "", description: "" });
        fetchTasks();
    };

    const editTask = (id) => {
        const task = tasks.find(task => task.id === id);
        setForm({ title: task.title, description: task.description });
        setEditWindow(id);
    };

    const updateTask = async (id) => {
        if (!form.title || !form.description) return;
        const res = await api.put(`tasks/${id}`, form);
        if(!res.error) {
            setSuccess("Task updated successfully");
        }
        else {
            setError("Failed to update task");
        }
        setForm({ title: "", description: "" });
        setEditWindow(null);
        fetchTasks();
    };

    const deletionTask = (id) => {
        setDeleteWindow(id);
    }

    const deleteTask = async (id) => {
        const res = await api.delete(`tasks/${id}`);
        if(!res.error) {
            setSuccess("Task deleted successfully");
        }
        else {
            setError("Failed to delete task");
        }  
        setDeleteWindow(null);
        fetchTasks();
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
            <h1>Dashboard ({role})</h1>
            <button className="btn-danger" onClick={logout}>Logout</button>
            </div>

            <div className="task-form">
            <h2>Add New Task</h2>
            <input
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <input
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
            />
            <button className="btn-primary" onClick={createTask}>Add</button>
            </div>

            <h2>Tasks</h2>

            {tasks.map(task => (
            <div key={task.id} className="task-card">
                <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                </div>
                <div className="task-actions">
                    <button className="btn-secondary" onClick={() => editTask(task.id)}>
                    Edit
                    </button>

                    {editWindow === task.id && (
                        <div className="modal-overlay">
                            <div className="edit-form">
                            <input
                                placeholder="Title"
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                            />

                            <input
                                placeholder="Description"
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                            />

                            <button
                                className="btn-primary"
                                onClick={() => updateTask(task.id)}
                            >
                                Save
                            </button>

                            <button
                                className="btn-secondary"
                                onClick={() => {setEditWindow(null); setForm({ title: "", description: "" })}}
                            >
                                Cancel
                            </button>
                            </div>
                        </div>
                    )}

                    <button className="btn-danger" onClick={() => deletionTask(task.id)}>
                    Delete
                    </button>

                    {deleteWindow === task.id && (
                        <div className="modal-overlay">
                            <div className="delete-form">
                            <p>Are you sure you want to delete this task?</p>
                            <button
                                className="btn-danger"
                                onClick={() => deleteTask(task.id)}
                            >
                                Yes
                            </button>
                            <button
                                className="btn-secondary"
                                onClick={() => setDeleteWindow(null)}
                            >
                                No
                            </button>
                            </div>
                        </div>
                    )}

                    { error && (
                        <div className="modal-overlay">
                            <div className="error-message">
                            <p>{error}</p>
                            <button
                                className="btn-danger"
                                onClick={() => setError(null)}
                            >
                                Close
                            </button>
                            </div>
                        </div>
                    )}
                    { success && (
                        <div className="modal-overlay">
                            <div className="success-message">
                            <p>{success}</p>
                            <button
                                className="btn-secondary"
                                onClick={() => setSuccess(null)}
                            >
                                Close
                            </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            ))}
        </div>
    );
}