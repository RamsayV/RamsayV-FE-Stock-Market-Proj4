import React, { useState } from 'react';

function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

   

    return (
        <form onSubmit={handleRegister}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} placeholder="Confirm Password" required />
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" required />
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" required />
            <button type="submit">Register</button>
        </form>
    );
}