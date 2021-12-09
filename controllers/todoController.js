import asyncHandler from "express-async-handler";
import Todo from "../models/todoModel.js";

// @desc    Get all tasks
// @route   GET /api/users/profile
// @access  Private
const getAllTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.find();
  if (todo) {
    return res.status(201).send(todo);
  } else {
    res.status(404);
    throw new Error("todo not found");
  }
});


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.find({ assignee: req.params.id });
  if (todo) {
    res.json({
      _id: todo[0]._id,
      completed: todo[0].completed,
      assignee: todo[0].assignee,
      task_name: todo[0].assignee
    });
  } else {
    res.status(404);
    throw new Error("todo not found");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const addTodo = asyncHandler(async (req, res) => {
  const { task_name, completed, assignee } = req.body;

  const todo = await Todo.create({
    task_name,
    completed,
    assignee,
  });

  if (todo) {
    res.status(201).json({
      _id: todo._id,
      task_name: todo.task_name,
      completed: todo.completed,
      assignee: todo.assignee,
    });
  } else {
    res.status(400);
    throw new Error("Invalid todo data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  console.log("req.body.completed", req.body.completed)
  if (todo) {
    todo.task_name = req.body.task_name || todo.task_name;
    todo.completed = req.body.completed;
    todo.assignee = req.body.assignee || todo.assignee;


    console.log("updated", todo)

    const updatedTodo = await todo.save();

    res.json({
      _id: updatedTodo._id,
      completed: updatedTodo.completed,
      task_name: updatedTodo.task_name,
      assignee: updatedTodo.assignee
    });
  } else {
    res.status(404);
    throw new Error("todo not found");
  }
});


const updateUserTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    todo.completed = req.body.completed || todo.completed;

    const updatedTodo = await todo.save();

    res.json({
      _id: updatedTodo._id,
      completed: updatedTodo.completed
    });
  } else {
    res.status(404);
    throw new Error("todo not found");
  }
});


export {
  getAllTodo,
  updateTodo,
  updateUserTodo,
  addTodo,
  getUserTodo
};
