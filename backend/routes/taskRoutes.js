const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/taskController");

router.use(auth); // 🔥 ALL ROUTES PROTECTED

router.post("/", createTask);
router.get("/", getTasks);
router.delete("/:id", deleteTask);

module.exports = router;
