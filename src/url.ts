import express from "express";
import { addIemHandler, createTodoHandler, deleteTodoHandler, duplicateTodoHandler, fetchOneItemInTodoHandler, fetchTodosHandler, getAllItemsInTodoHandler, getATodoHandler, updateIemHandler } from "./routes/todo";


const router = express.Router();

router.get("/todo/_all", fetchTodosHandler);
router.get("/todo/list_items", getAllItemsInTodoHandler);
router.get("/todo/_single", getATodoHandler);
router.get("/todo/_single_item", fetchOneItemInTodoHandler);


router.post("/todo/_create", createTodoHandler);
router.post("/todo/add_item", addIemHandler);
router.post("/todo/duplicate", duplicateTodoHandler);

router.patch("/todo/update_item", updateIemHandler);

router.delete("/todo/_delete", deleteTodoHandler);



export default router;
