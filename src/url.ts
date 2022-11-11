import express from "express";
import { addIemHandler, createTodoHandler, fetchTodosHandler } from "./routes/todo";


const router = express.Router();

router.post("/todo/_create", createTodoHandler);
router.post("/todo/add_item", addIemHandler);
router.get("/todo/_all", fetchTodosHandler);

export default router;
