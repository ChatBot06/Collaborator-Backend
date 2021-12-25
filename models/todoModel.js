import mongoose from 'mongoose'

const todoSchema = mongoose.Schema(
  {
    task_name: {
      type: String,
      required: true,
    },
    completed: {
     type:Boolean,
     default:true,
     required: true
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
  },
  {
    timestamps: true,
  }
)

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
