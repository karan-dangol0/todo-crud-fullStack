import Todo from "../models/todo.model.js";
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json({ success: true, message: "Got all the todos", data: todos });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const createTodo = async (req, res) => {
  
  try {
    const { task, completed } = req.body;
    const newTodo = new Todo({ task, completed });
    await newTodo.save();
    res.status(201).json({ success: true, message: "Todo Created!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const editTodo = async (req, res) => {
  try {
    // const editTodo = await Todo.find({ req.params });
    const { id } = req.params; // localhost:3000/24343 id=24343 id is given by mongodb
    const { task, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, completed },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, message: "Todo updated!", data: updatedTodo });
  } catch (error) {
    res.json({ success: false, message: `Error editing file: ${error.message}` });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Todo Deleted!", data: deletedTodo });
  } catch (error) {
    res.json({ success: false, message: `Error deleting todo: ${error.message}` });
  }
};

export { getTodos, createTodo, editTodo, deleteTodo };
