import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
        const res = await api.post("auth/login", form);

        login(res.data.access, res.data.role);
        navigate("/dashboard");

        } catch (err) {
        alert(err.response?.data?.error || "Invalid credentials");
        }
    };

    return (
        <div className="auth-container">
            <div className="card">
            <h2>Login</h2>

            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />

            <button className="btn-primary" onClick={handleSubmit}>
                Login
            </button>
            </div>
        </div>
    );
}