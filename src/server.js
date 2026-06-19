import express from 'express';
import 'dotenv/config';
import alunosRoutes from './routes/alunosRoute.js';
import { apiKey } from './lib/middlewarer/apiKey.js';
import arquivoRoutes from './routes/arquivoRoute.js';

app.use('/api/exemplos', apiKey, arquivoRoutes);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/exemplos', apiKey, alunosRoutes);

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/api/alunos', alunosRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
