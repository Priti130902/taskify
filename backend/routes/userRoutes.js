const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// GET logged-in user
router.get("/me", auth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
