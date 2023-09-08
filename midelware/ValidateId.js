export const validationId = (req,res,next) => {
    try {
        const taskId = req.params.id;
        if(!taskId || taskId === "null" || !taskId === typeof(1)  ){
            return res.status(400).send("Falta el id")
        }
        next()
    } catch (error) {
        return res.status(500).send(error)
    }
}