const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Task create failed" });
  }
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
  res.json(tasks);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
