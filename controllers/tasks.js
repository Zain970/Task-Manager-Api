const Task = require("../models/task.js");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error")

const getAllTasks = asyncWrapper(async (req, res, next) => {

    // Get all the tasks
    const tasks = await Task.find({});

    res.status(200).json({
        status: "success",
        tasks
    })
});
const createTask = asyncWrapper(async (req, res, next) => {
    const { name, completed } = req.body;

    // Create a new task
    const newTask = await Task.create({
        name,
        completed
    });

    console.log("New created task : ", newTask);
    // Sending the response after creating a new task
    res.status(201).json({ task: newTask });
});
const getTask = asyncWrapper(async (req, res, next) => {

    // Destructing the id
    const { id: taskID } = req.params;

    // Finding the task by id 
    const task = await Task.findOne({ _id: taskID });

    // If not task found
    if (!task) {


        return next(createCustomError(`No task with id ${taskID}`, 404));

    }
    console.log("Task found :", task);
    // Sending the response
    res.status(200).json({
        status: "success",
        task
    })
});
const deleteTask = asyncWrapper(async (req, res, next) => {

    // Destructing the id
    const { id: taskID } = req.params;

    // Deleting the task
    const task = await Task.findOneAndDelete({ _id: taskID });

    // If no task with that id exists
    if (!task) {
        return next(createCustomError(`No task with id ${taskID}`, 404));

    }

    // If task deleted return the success message
    res.status(200).json({
        status: "success",
        task
    })
});
const updateTask = asyncWrapper(async (req, res, next) => {

    const { id: taskID } = req.params;

    // 1).After updating we want to get the new one back
    // 2).Validators are also not run that are required

    // 1).Send new document and run the model validators
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })

    // If no task found
    if (!task) {
        return next(createCustomError(`No task with id ${taskID}`, 404));

    }
    // If all went fine
    res.status(200).json({ task });
});
module.exports = {
    getAllTasks,
    createTask,
    deleteTask,
    getTask,
    updateTask
}