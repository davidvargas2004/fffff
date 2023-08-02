//este app.js funciona para configurar todo el codigo de express y el bakend

import express from "express";
import morgan  from "morgan";// esta dependencio funciona para recibir las peticione que vayamos recibiendo
import cookieParser from  'cookie-parser';
import cors from 'cors';
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";


const app = express();
app.use(cors(
    {origin: 'http://localhost:3000',
    credentials: true,
}
    
));
app.use(morgan('dev'));//morgan es un middleware para aplicaciones Express que registra automáticamente las solicitudes HTTP entrantes en el servidor
app.use(express.json());//para converti los req.body en formato json
app.use(cookieParser());//para pasar la informacion de las cokies
 
app.use("/api", authRoutes);
app.use("/api/", tasksRoutes);



export default app;

