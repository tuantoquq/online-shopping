import express from 'express';
import 'dotenv/config';
import mongoDBConnect from './config/db.js';

const app = express();

app.use(express.json());
//routes

const PORT = process.env.SERVER_PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
    mongoDBConnect();
});
