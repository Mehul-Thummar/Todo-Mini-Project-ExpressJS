const express = require("express");
const todoRoutes = express.Router();
const {
    getAllTodo,
    createTodo,
    todo,
    deleteTodo,
    completeTodo,

} = require("../controller/todo.controller");
const { verifyToken } = require("../helpers/verifyToken");

todoRoutes.get("/gettodo", todo);
todoRoutes.post("/newtodo", verifyToken, createTodo);
todoRoutes.get("/alltodo", verifyToken, getAllTodo);
todoRoutes.post("/:taskId/delete", deleteTodo);
todoRoutes.post("/:taskId/complete", completeTodo);

// // to update the todo
// todoRoutes.put("/todo-update", updateTodo);




module.exports = todoRoutes;