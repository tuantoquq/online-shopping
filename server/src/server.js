import express from 'express';
import 'dotenv/config';
import mongoDBConnect from './config/db.js';
import {
    authRoutes,
    customerRoutes,
    categoryRoutes,
    productRoutes,
} from './routes/index.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

//routes
app.use(authRoutes);
app.use(customerRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
const PORT = process.env.SERVER_PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
    mongoDBConnect();
});
