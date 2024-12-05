import express from 'express';
import { serieRoutes } from "./src/routes/serieRoutes.js";
import { connectdb } from './src/config/mongo.js';
import { userRoutes } from './src/routes/userRoutes.js';
import { auth } from './src/middleware/authMiddleware.js'
import helmet from 'helmet';
import cors from 'cors'

process.loadEnvFile();
const PORT = process.env.PORT;

const app = express(); 

app.use(express.json());

app.use(helmet());

app.use(cors());

app.use('/api/user', userRoutes );

app.use('/api/series', auth, serieRoutes );

app.listen(PORT, () => {
    connectdb();
    console.log("Server activo en http://localhost:" + PORT);
})
