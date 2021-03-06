import express from 'express';
import 'dotenv/config';
import mongoDBConnect from './config/db.js';
import {
    authRoutes,
    customerRoutes,
    categoryRoutes,
    productRoutes,
    cartItemsRoutes,
    statisticRoutes
} from './routes/index.js';
import cors from 'cors';
import commentRoutes from './routes/comment.routes.js';
import uploadFileRoutes from './routes/uploadFile.routes.js';
import deliverAddressRoutes from './routes/deliveryAddress.routes.js';
import orderRoutes from './routes/order.routes.js';
import morgan from 'morgan';
import shopRoutes from './routes/shop.routes.js';
import shopperRoutes from './routes/shopper.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();
app.use(cors());
app.use(morgan('combined'));

app.use(express.json());

//routes
app.use(authRoutes);
app.use(customerRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartItemsRoutes);
app.use(commentRoutes);
app.use(uploadFileRoutes);
app.use(deliverAddressRoutes);
app.use(orderRoutes);
app.use(shopRoutes);
app.use(shopperRoutes);
app.use(statisticRoutes);
app.use(adminRoutes);

const PORT = process.env.SERVER_PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
    mongoDBConnect();
});
