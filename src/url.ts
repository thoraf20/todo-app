import express from "express";
import { addIemHandler, createTodoHandler, duplicateTodoHandler, fetchTodosHandler, updateIemHandler } from "./routes/todo";


const router = express.Router();

router.post("/todo/_create", createTodoHandler);
router.post("/todo/add_item", addIemHandler);
router.get("/todo/_all", fetchTodosHandler);
router.patch("/todo/update_item", updateIemHandler);
router.post("/todo/duplicate", duplicateTodoHandler);


export default router;
