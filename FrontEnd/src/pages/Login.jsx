import axiosClient from './axios-client';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // 1. Récupérer le cookie CSRF (Obligatoire avant le login)
            await axiosClient.get('/sanctum/csrf-cookie');

            // 2. Faire la requête de login
            await axiosClient.post('/api/login', { email, password });

            // 3. Si succès, tu peux récupérer l'user
            const userResponse = await axiosClient.get('/api/user');
            console.log("User connecté :", userResponse.data);
            
            // Rediriger l'utilisateur vers le dashboard...

        } catch (error) {
            console.error("Erreur de login", error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Se connecter</button>
        </form>
    );
};