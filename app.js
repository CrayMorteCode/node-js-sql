const mysql = require("mysql2");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cR@yM06t3",
  database: "nodejs_rest_api",
});
db.connect(function (err) {
  if (err) {
    console.log("error cooneecting to database");
    return;
  } else {
    console.log("mysql connected to database");
  }
});

app.listen(port, () => {
  console.log("server is running");
});

app.get("/users", (req, res) => {
  db.query("select * from users", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("select * from users where id=?", [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query("insert into users (name,email) values(?,?)",
    [name,email],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query(
    "update users set name =?,email =? where id= ?",
    [name, email, id],
    (err, result) => {
      res.json({ message: "user updated successfully" });
    }
  );
});
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("delete from users where id =?", [id], (err, result) => {
    if (err) throw err;
    res.json({message:"user deleted succesfully"})
  });
});
