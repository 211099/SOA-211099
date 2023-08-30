import express, { response } from 'express';
import { Tareas } from './models/TaskModel.js';

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());


app.get('/get/list')
app.post('/post/addTask')
app.put('/put/actualizeTask')
app.delete('/delete/:id')


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
