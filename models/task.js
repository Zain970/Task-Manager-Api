const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide a name"],
        trim: true,
        maxlength: [20, "name cannot be more than 20 characters"],
    },
    completed: {
        type: Boolean,
        default: false
    }
})

taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel