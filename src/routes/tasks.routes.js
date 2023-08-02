import { Router } from "express";
import{funcioncookie} from "../middlewares/validateToken.js";
import { 
    getTask,
    getTasks,
    createTasks,
    updateTasks,
    deleteTasks 
} from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {createTaskSchema} from "../schemas/task.schema.js";

const router =  Router();

router.get('/tasks', funcioncookie,getTasks);
router.get('/tasks/:id', funcioncookie,getTask);
router.post('/tasks', funcioncookie,validateSchema(createTaskSchema),createTasks);
router.delete('/tasks/:id', funcioncookie,deleteTasks);
router.put('/tasks/:id', funcioncookie,updateTasks);

export default router;