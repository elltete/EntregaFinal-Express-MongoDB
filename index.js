import express from 'express';
import { connectdb } from './src/config/mongo.js';

process.loadEnvFile();
const PORT = process.env.PORT;

const app = express(); 

app.use(express.json());

app.listen(PORT, () => {
    connectdb();
    console.log("Server activo en http://localhost:" + PORT);
})