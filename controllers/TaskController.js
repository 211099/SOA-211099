

const AddTask = async (res,req) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).send({error: "invalido"});
            return;
        }
    
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
       
        if (tokenData.id) {
            const data = req.body;
            await Tareas.create({title: data.title, description: data.description});
            res.status(200).send('tarea creada');
        }
        else {
            res.status(401).send({error: "invalido"});
        }
    
    } catch (error) {
        res.status(500).send('ocurrio un error' + error)
    }
}
const DeleteTask = (res,req) => {

}
const UpdateTask = (res,req) => {

}
const completetask = (res,req) => {

}
const GetAllTask = (res,req) => {

}
const GetTask = (res,req) => {

}



export default {AddUser}