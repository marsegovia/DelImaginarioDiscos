import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./src/routes/products.routes.js";
import authRouter from './src/routes/auth.routes.js';
import path from "path";
import { fileURLToPath } from "url";
//import { authentication } from './Src/Middlewares/authentication.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Necesario para usar __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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


// Servir carpeta FrontEnd
app.use(express.static(path.join(__dirname, '../FrontEnd')));
app.use(express.static(path.join(__dirname, '../Public')));

app.get('/Admin-panel', (req,res) => {
    res.sendFile(path.join(__dirname, '../Public','index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/Admin/admin.html'));
});


app.use('/', authRouter);
app.use("/products", productRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        path: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto",PORT);
});
