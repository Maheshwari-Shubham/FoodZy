import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/api/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });

            const json = await response.json();
            if (!response.ok || !json.success || !json.authToken) {
                alert(json.message || "Enter valid credentials");
                return;
            }

            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            navigate("/");
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed. Please try again.');
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <>
            <div className="signup-page">
                <Link to="/" className="signup-brand" aria-label="FoodZy home">FoodZy<span>.</span></Link>
                <main className="signup-layout">
                    <section className="signup-panel">
                        <p className="signup-eyebrow">A seat at the table</p>
                        <h1>Good food<br />starts here.</h1>
                        <p className="signup-intro">Create your account and make your next meal the easy part of the day.</p>
                        <form onSubmit={handleSubmit} className="signup-form">
                            <div className="signup-field">
                                <label htmlFor="name" className="form-label">Your name</label>
                                <input type="text" className="form-control" name="name" id="name" autoComplete="name" value={credentials.name} onChange={onChange} minLength={3} required />
                            </div>
                            <div className="signup-field">
                                <label htmlFor="signup-email" className="form-label">Email address</label>
                                <input type="email" className="form-control" name="email" id="signup-email" autoComplete="email" value={credentials.email} onChange={onChange} required />
                            </div>
                            <div className="signup-field">
                                <label htmlFor="signup-password" className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" id="signup-password" autoComplete="new-password" value={credentials.password} onChange={onChange} minLength={5} required />
                            </div>
                            <div className="signup-field">
                                <label htmlFor="address" className="form-label">Delivery address</label>
                                <input type="text" className="form-control" name="geolocation" id="address" autoComplete="street-address" value={credentials.geolocation} onChange={onChange} required />
                            </div>
                            <button type="submit" className="btn signup-submit">Create account <span aria-hidden="true">&#8594;</span></button>
                        </form>
                        <p className="signup-login">Already have an account? <Link to="/login">Log in</Link></p>
                    </section>
                    <aside className="signup-visual" aria-label="A freshly made burger with fries">
                        <div className="signup-visual-copy">
                            <span>Made for your kind of hungry</span>
                            <p>Little cravings.<br />Big happy moments.</p>
                        </div>
                    </aside>
                </main>
            </div>
        </>
    );
}
