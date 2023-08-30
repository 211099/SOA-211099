import express, { response } from 'express';
import { Tareas } from './models/TaskModel.js';

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());


app.get('/get/list', async (req,res) =>{
    try {
        const listTask = await Tareas.findAll({
            where: {delete: null}
        })
        console.log(listTask)
        res.send(listTask)

    } catch (error) {
        res.send('ocurrio un error', error)
    }
})
app.post('/post/addTask', async (req,res) => {
    try {
        const data = await req.body
        await Tareas.create({title: data.title, description: data.description})
        res.send('tarea creada')
    } catch (error) {
        res.send('ocurrio un error', error)
    }
    
})

app.put('/put/actualizeTask')

app.delete('/delete/:id')


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
