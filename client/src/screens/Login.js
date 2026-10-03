import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API_BASE_URL from '../api'
export default function Login() {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/api/loginuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();
            console.log("Server Response:", json);

            if (!json.success) {
                alert("Enter valid credentials");
            } else {
                localStorage.setItem("userEmail", credentials.email);
                localStorage.setItem("authToken", json.authToken);
                console.log("Stored Email:", localStorage.getItem("userEmail")); // Debug log
                navigate("/");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login failed. Enter valid credentials");
        }
    };

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <>
            <div className="auth-page">
                <Link to="/" className="auth-brand" aria-label="FoodZy home">FoodZy<span>.</span></Link>
                <main className="auth-layout">
                    <section className="auth-panel">
                        <p className="auth-eyebrow">Welcome back</p>
                        <h1>Your table<br />is ready.</h1>
                        <p className="auth-intro">Sign in to find your favorites and pick up where your appetite left off.</p>
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="auth-field">
                                <label htmlFor="login-email" className="form-label">Email address</label>
                                <input type="email" className="form-control" name="email" id="login-email" autoComplete="email" value={credentials.email} onChange={onChange} required />
                            </div>
                            <div className="auth-field">
                                <label htmlFor="login-password" className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" id="login-password" autoComplete="current-password" value={credentials.password} onChange={onChange} required />
                            </div>
                            <button type="submit" className="btn auth-submit">Sign in <span aria-hidden="true">&#8594;</span></button>
                        </form>
                        <p className="auth-switch">New to FoodZy? <Link to="/createuser">Create an account</Link></p>
                    </section>
                    <aside className="auth-visual" aria-label="A freshly made burger with fries">
                        <div className="auth-visual-copy">
                            <span>Good to have you back</span>
                            <p>Your favorites<br />are waiting.</p>
                        </div>
                    </aside>
                </main>
            </div>
        </>
    )
}
