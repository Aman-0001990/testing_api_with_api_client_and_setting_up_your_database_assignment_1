// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const studentData=require('./data.json');

const app = express();
app.use(express.json());
const port = 3000;


app.post('/students/above-threshold', (req, res) => {
  const {threshold}=req.body;
  if(typeof threshold!='number' || threshold<0){
    return res.status(400).json({error:"'threshold' must be a number and is required"});
  }

  const filteredStudent = studentData.filter((student)=>student.total>threshold).map((student)=>({
    name : student.name,
    total : student.total,
  }));

  res.json({count : filteredStudent.length, students : filteredStudent})
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


