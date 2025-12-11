import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000', // URL de ton Laravel
    withCredentials: true, // IMPORTANT : Autorise l'envoi des cookies
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default axiosClient;