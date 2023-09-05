import express, { response } from 'express';



import taskRoutes from "./routes/TaskRoutes.js";
import userRoutes from "./routes/UserRoutes.js";

import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();

export const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());

// tareas
// Aqui invocamos a las ruta
app.use("/api",taskRoutes)
app.use("/api",userRoutes)

//usuario







app.listen(port, () => {
    console.log(`App listening on port ${process.env.DATABASE_URL}`);
});
