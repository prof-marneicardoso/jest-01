
import express from 'express';
import User from './models/User.js';

const app = express();

// Permite que o express interprete o corpo da requisição como JSON
app.use(express.json());

// Rota para obter todos os usuários
app.get('/users', async (request, response) => {
    try {
        // Busca todos os usuários na DB
        const users = await User.findAll();
        response.status(200).json(users);

    } catch (error) {
        console.error('Erro ao buscar usuários: ', error);
        response.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

export default app;
