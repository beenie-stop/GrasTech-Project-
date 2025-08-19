
import express from "express"

import { register,signIn} from "../controller/usercontroller.js"
import { addTask,getTodayTasks,  getAllTasks, deleteTask, updateTaskNote } from "../controller/taskcontroller.js";
import {authentication} from "../middleware/auth.js";


const router=express.Router();

router.post('/register',register)
router.post('/signin', signIn)

//post

router.post("/add", authentication, addTask);
 router.get("/todaytask", authentication, getTodayTasks);
router.get("/allTask", authentication, getAllTasks);
router.delete("/tasks/:id", authentication, deleteTask);
router.patch("/:id", authentication, updateTaskNote);
export default router;





















