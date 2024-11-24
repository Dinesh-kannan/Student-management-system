const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'student_management'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

// Routes
// Fetch all students
app.get('/students', (req, res) => {
  const query = 'SELECT * FROM Students';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new student
app.post('/add-student', (req, res) => {
  const { name, email, dob, course } = req.body;
  const query = 'INSERT INTO Students (Name, Email, DOB) VALUES (?, ?, ?)';
  db.query(query, [name, email, dob], (err, result) => {
    if (err) throw err;

    // Add course enrollment (example: course = 'Mathematics')
    const enrollmentQuery = 'INSERT INTO Enrollments (StudentID, CourseID) VALUES (?, ?)';
    db.query(enrollmentQuery, [result.insertId, course], (err) => {
      if (err) throw err;
      res.send('Student added successfully!');
    });
  });
});

// Fetch a specific student's details
app.get('/student/:id', (req, res) => {
  const studentId = req.params.id;
  const query = `
    SELECT s.Name, s.Email, c.CourseName 
    FROM Students s
    JOIN Enrollments e ON s.StudentID = e.StudentID
    JOIN Courses c ON e.CourseID = c.CourseID
    WHERE s.StudentID = ?`;
  db.query(query, [studentId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
