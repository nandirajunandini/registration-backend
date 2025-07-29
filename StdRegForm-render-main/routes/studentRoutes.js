const express = require("express");
const router = express.Router();
const { getAllStudents, addStudent } = require("../controllers/studentController");

// Routes
router.get("/", getAllStudents);      // GET /api/students
router.post("/", addStudent);         // POST /api/students

module.exports = router;
