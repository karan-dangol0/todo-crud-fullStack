import express from "express";
import { Router } from "express";
import { createTodo, deleteTodo, editTodo, getTodos } from "../controllers/todo.controller.js";
import validate    from "../middleware/todo.middleware.js";
import todoValidationSchema from "../validation/todo.validation.js";
import limiter from "../middleware/ratelimiter.middleware.js";

const todoRouter = express.Router();

todoRouter.get("/", getTodos);
todoRouter.post("/", limiter, validate(todoValidationSchema), createTodo);
todoRouter.put("/:id", editTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;