const { pool } = require("../models/db");

// GET all students
const getAllStudents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM studentdata ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching students" });
  }
};

// ADD new student
const addStudent = async (req, res) => {
  const { registration_id, student_name, email, department, address, phone_number, pincode } = req.body;
  try {
    const query = `
      INSERT INTO studentdata 
      (registration_id, student_name, email, department, address, phone_number, pincode)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [registration_id, student_name, email, department, address, phone_number, pincode];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error adding student" });
  }
};

module.exports = { getAllStudents, addStudent }; 
