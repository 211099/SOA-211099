import express, { response } from 'express';
import { Tareas } from './models/TaskModel.js';
import { User } from './models/UserModel.js';
import { encrypt } from './ashs.js';
import { compare } from './ashs.js';


export const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// tareas

app.get('/get/list', async (req,res) =>{
    try {
        const listTask = await Tareas.findAll({
            where: {delete: null}
        })
      
        res.status(200).send(listTask)

    } catch (error) {
        res.send('ocurrio un error', error)
    }
})

app.post('/post/addTask', async (req,res) => {
    try {
        const data = await req.body
        await Tareas.create({title: data.title, description: data.description})
        res.status(200).send('tarea creada')
    } catch (error) {
        res.send('ocurrio un error', error)
    }
    
})

app.put('/put/actualizeTask/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description } = req.body;

        // Verificar si el título y la descripción fueron enviados
        if (!title && !description) {
            return res.status(400).send('Debe enviar al menos un campo (title o description) para actualizar.');
        }

        // Construir los datos a actualizar
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;

        // Actualizar la tarea en la base de datos
        const [updatedRows] = await Tareas.update(updateData, {
            where: { id: taskId }
        });

        // Si no se actualizó ninguna fila, entonces el ID de tarea no existe
        if (updatedRows === 0) {
            return res.status(404).send('Tarea no encontrada.');
        }

        // Devolver la tarea actualizada
        const updatedTask = await Tareas.findOne({
            where: { id: taskId }
        });

        res.status(200).send('tarea actualizada');
    } catch (error) {
        res.status(500).send(`Ocurrió un error al actualizar: ${error.message}`);
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        // Actualiza el campo 'delete' con la fecha actual
        const [updatedRows] = await Tareas.update({
            delete: new Date()
        }, {
            where: { id: taskId }
        });

        // Verifica si se actualizó alguna fila
        if (updatedRows === 0) {
            return res.status(404).send('Tarea no encontrada.');
        }

        res.status(200).send(`Tarea con ID ${taskId} marcada como eliminada.`);
    } catch (error) {
        res.status(500).send(`Ocurrió un error al marcar la tarea como eliminada: ${error.message}`);
    }
});




//usuario

app.post('/post/sig-up', async (req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const passwordHashs = await encrypt(password)
        await User.create({email: email, password: passwordHashs})
        res.status(200).send('usuario registrado')
    } catch (error) {
         res.status(500).send('Ocurrió un error: ' + error.message);
    }
})

// app.post('/post/sing-in', async (req,res) => {
    
    
// })






app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
