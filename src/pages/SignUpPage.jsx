import React, { useState } from 'react';
import img from '../assets/VaX01A01.svg'; // Assuming you want to use the same image

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    async function createUser() {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup/`, {
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
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <input
                        className="bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 block w-full focus:border-blue-500 focus:outline-none"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                    />
                    <input
                        className="bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 block w-full focus:border-blue-500 focus:outline-none"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                    />
                    <input
                        className="bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 block w-full focus:border-blue-500 focus:outline-none"
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        placeholder="Confirm Password"
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
                </form>
            </div>

            <div className="w-full md:w-3/4 lg:w-1/2 hidden lg:block">
                <img src={img} alt="Decorative" />
            </div>
        </div>
    );
};

export default SignUp;