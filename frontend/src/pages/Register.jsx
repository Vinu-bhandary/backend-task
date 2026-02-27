import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "user",
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
        await api.post("auth/register", form);
        alert("Registration successful");
        navigate("/");
        } catch (err) {
        alert(err.response?.data?.error || "Error occurred");
        }
    };

    return (
        <div className="auth-container">
            <div className="card">
            <h2>Register</h2>

            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />

            <select name="role" onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <button className="btn-success" onClick={handleSubmit}>
                Register
            </button>
            </div>
        </div>
    );
}