import { Router } from "express";
import {AddTask, DeleteTask, UpdateTask, Completetask, GetAllTask, GetTask } from "../controllers/TaskController.js"
import { validationCreateTask } from "../validators/Task.js";
import { validationId } from "../midelware/ValidateId.js";


const router = Router()


router.get('/get/task/:id',validationId, GetTask);

router.get('/get/list', GetAllTask)

router.post('/post/addTask',validationCreateTask, AddTask)

router.put('/put/actualizeTask/:id', UpdateTask);

router.delete('/delete/:id',validationId, DeleteTask);

router.patch('/patch/completetask/:id',validationId, Completetask);


export default router