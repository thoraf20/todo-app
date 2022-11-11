import express from "express";
import { addIemHandler, createTodoHandler, duplicateTodoHandler, fetchTodosHandler, getAllItemsInTodoHandler, updateIemHandler } from "./routes/todo";


const router = express.Router();

router.get("/todo/_all", fetchTodosHandler);
router.get("/todo/list_items", getAllItemsInTodoHandler);

router.post("/todo/_create", createTodoHandler);
router.post("/todo/add_item", addIemHandler);
router.post("/todo/duplicate", duplicateTodoHandler);

router.patch("/todo/update_item", updateIemHandler);


export default router;
