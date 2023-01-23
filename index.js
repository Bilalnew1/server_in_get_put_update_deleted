const express = require("express");
const student = require("./data");

const app = express();
app.use(express.json());

app.listen(3005, () => {
  console.log("listing to this port at 3000");
});

app.get("/api/student", (req, res) => {
  res.json(student);
});

app.post("/api/student", (req, res) => {
  if (!req.body.email) {
    res.status(400);
    return res.json({ error: "email is required..." });
  }
  const user = {
    id: student.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };
  student.push(user);
  res.send(user);
});

app.put("/api/student/:id", (req, res) => {
  let id = req.params.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let index = student.findIndex((student) => {
    return student.id == Number.parseInt(id);
  });
  if (index >= 0) {
    let std = student[index];
    (std.last_name = last_name),
      (std.first_name = first_name),
      (std.email = email);
    res.json(std);
  } else {
    res.send(404);
    res.end();
  }
});

app.delete("/api/student/:id", (req, res) => {
  let id = req.params.id;
  let index = student.findIndex((student) => {
    return student.id == Number.parseInt(id);
  });
  if (index >= 0) {
    let std = student[index];
    student.splice(index, 1);
    res.json(std);
  } else {
    res.send(404);
  }
});
