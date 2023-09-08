import { verifyToken } from '../helpers/generarToken.js';
import { Tareas } from '../models/TaskModel.js';

export const AddTask = async (req,res) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).send({error: "invalido"});
            return;
        }
    
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
       
        if (tokenData && tokenData.id) {
            const data = req.body;
            await Tareas.create({title: data.title, description: data.description});
            res.status(201).send('tarea creada');
        }
        else {
            res.status(401).send({error: "invalido"});
        }
    
    } catch (error) {
        
        res.status(500).send('ocurrio un error' + error)
    }
}

export const DeleteTask = async (req,res)  => {
    try {
        if (!req.headers.authorization) {
            res.status(401).send("invalido");
            return;
        }

        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);

        if (tokenData.id) {
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
        } else {
            res.status(401).send({error: "invalido"});
        }
        
    } catch (error) {
        res.status(500).send(`Ocurrió un error al marcar la tarea como eliminada: ${error.message}`);
    }
}

export const UpdateTask = async (req,res)  => {
   try {
        if (!req.headers.authorization) {
            res.status(401).send("invalido");
            return;
        }

        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);

        if (tokenData.id) {
              const taskId = req.params.id;
            const { title, description } = req.body;

        
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
        } else {
            res.status(401).send({error: "invalido"});
        }
        
    } catch (error) {
        res.status(500).send(`Ocurrió un error al actualizar: ${error.message}`);
    }
}

export const Completetask = async (req,res)  => {
    const taskId = req.params.id;
    try {
        if (!req.headers.authorization) {
            res.status(401).send({error: "invalido"});
            return;
        }
    
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);

        if (tokenData.id) {
            const task = await Tareas.findByPk(taskId);

            if (!task) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }

            await task.update({ status: true });
            return res.status(200).json({ message: 'Tarea actualizada exitosamente' });

        } else {
            res.status(401).send({error: "invalido"});
        }

        
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const GetAllTask = async (req,res) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).send({error: "invalido"});
            return;
        }

        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);

        if (tokenData.id) {
            const listTask = await Tareas.findAll({
                where: {delete: null}
            })
            res.status(200).send(listTask)
        } else {
            res.status(401).send({error: "invalido"});
        }

    } catch (error) {
        res.send('ocurrio un error', error)
    }
}

export const GetTask = async (req,res) => {
    try {
        
        const task = await Tareas.findAll({
            where: { id: req.params.id }
        });
        
        if (!task || task.length === 0) {
            res.status(404).send('No encontrado');
        } else {
            res.status(200).send('Encontrado: ' + JSON.stringify(task));
        }
    } catch (error) {
       return res.status(500).send(error);
        
    }
}




