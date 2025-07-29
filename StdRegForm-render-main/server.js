const express = require('express');
const cors = require('cors');
const { pool } = require('./models/db');
const studentRoutes = require('./routes/studentRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create Table
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS studentdata (
      id SERIAL PRIMARY KEY,
      registration_id VARCHAR(50),
      student_name VARCHAR(100),
      email VARCHAR(100),
      department VARCHAR(100),
      address TEXT,
      phone_number VARCHAR(15),
      pincode VARCHAR(10)
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ 'studentdata' table is ready.");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
};

createTable();

app.get("/", (req, res) => {
  res.send("✅ Backend is running.");
});

// Routes
app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
