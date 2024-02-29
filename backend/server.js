import path from 'path';
import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
dotenv.config();
connectDB();


const port = process.env.PORT || 5000;


const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}));

//cookie parser middleware
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send('API is runnning');
})



app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload', uploadRoutes);


app.get('/api/config/paypal', (req, res) => res.send({
    clientId: process.env.PAYPAL_CLIENT_ID
}));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname,'/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server running on port: ${port}`));