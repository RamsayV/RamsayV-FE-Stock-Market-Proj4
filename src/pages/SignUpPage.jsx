import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    async function createUser() {
        try {
            const response = await fetch("http://localhost:8000/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    password_confirmation: passwordConfirmation,
                    // Include other signup fields as needed
                }),
            });

            if (response.ok) {
                // User successfully created, handle accordingly
                const data = await response.json();
                console.log("User created successfully", data);

                // Store the token received from the response (assuming it's in data.token)
                localStorage.setItem('authToken', data.token);
            } else {
                // Handle error cases
                console.log("Failed to create user");
            }
        } catch (error) {
            console.error("Error creating user", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser();
    };

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password Confirmation:
                    <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}