import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./src/Routes/products.routes.js";
//import authRouter from './Src/Routes/auth.routes.js';
//import { authentication } from './Src/Middlewares/authentication.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsConfig = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length'],
    credentials: true,
    maxAge: 600,
    optionsSuccessStatus: 204
};

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Datos received at: ${req.method} ${req.url}`);
    next();
});

//app.use('/auth', authRouter);
app.use("/products", productRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        path: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
