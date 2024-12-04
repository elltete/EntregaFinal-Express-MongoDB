import express from 'express';
import { seriesRoutes } from "./src/routes/serieRoutes.js";
import { connectdb } from './src/config/mongo.js';
import { authRoutes } from './src/routes/authRoutes.js';
import { auth } from './src/middleware/authMiddleware.js'
import helmet from 'helmet';
import cors from 'cors'

process.loadEnvFile();
const PORT = process.env.PORT;

const app = express(); 

app.use(express.json());

app.use(helmet());

app.use(cors());

app.use('/api/auth', authRoutes );

app.use('/api/series', auth, seriesRoutes );

app.listen(PORT, () => {
    connectdb();
    console.log("Server activo en http://localhost:" + PORT);
})


// joi o express-validator
// middleware manejo de errores
