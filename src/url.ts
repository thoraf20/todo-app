import express from "express";
import { addItemHandler, createTodoHandler, deleteItemInTodoHandler, deleteTodoHandler, duplicateTodoHandler, duplicateTodoItemHandler, fetchOneItemInTodoHandler, fetchTodosHandler, getAllItemsInTodoHandler, getATodoHandler, updateIemHandler } from "./routes/todo";


const router = express.Router();

router.get("/todo/_all", fetchTodosHandler);
router.get("/todo/list_items", getAllItemsInTodoHandler);
router.get("/todo/_single", getATodoHandler);
router.get("/todo/_single_item", fetchOneItemInTodoHandler);


router.post("/todo/_create", createTodoHandler);
router.post("/todo/add_item", addItemHandler);
router.post("/todo/duplicate", duplicateTodoHandler);
router.post("/todo/item/_duplicate", duplicateTodoItemHandler);

router.patch("/todo/update_item", updateIemHandler);

router.delete("/todo/_delete", deleteTodoHandler);
router.delete("/todo/item/_delete", deleteItemInTodoHandler);


export default router;
