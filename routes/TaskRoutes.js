import { Router } from "express";
import {AddTask, DeleteTask, UpdateTask, Completetask, GetAllTask, GetTask } from "../controllers/TaskController.js"

const router = Router()


router.get('/get/task/:id', GetTask);

router.get('/get/list', GetAllTask)

router.post('/post/addTask', AddTask)

router.put('/put/actualizeTask/:id', Completetask);

router.delete('/delete/:id', DeleteTask);

router.patch('/patch/completetask/:id',UpdateTask);


export default router