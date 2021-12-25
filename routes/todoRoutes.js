import express from "express";
const router = express.Router();
import {
  getAllTodo,
  getUserTodo,
  addTodo,
  updateTodo,
  updateUserTodo,
  deleteTodo
} from "../controllers/todoController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(addTodo).get(getAllTodo);

router.get("/getUserTodo/:id", getUserTodo);
router.delete("/deleteTodo/:id", deleteTodo);
router.route("/updateUserTodo/:id").put(updateUserTodo);
router.route("/updateTodo/:id").put(updateTodo);

export default router;
