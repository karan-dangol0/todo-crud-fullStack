import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    task: {
        type: String,
        required: [true, "Task name is required"],
        min: 2,
        max: 100,
    },
    completed: {
        type: Boolean,
        default: false,
    }


}, { timestamps: true });

const Todo = new mongoose.model("Todo", todoSchema);
export default Todo;

