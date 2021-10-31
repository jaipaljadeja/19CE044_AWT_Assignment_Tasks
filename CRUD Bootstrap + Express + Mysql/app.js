const path = require("path");
const express = require("express");
const ejs = require("ejs");
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "courseinfo",
});

require("dotenv").config();
const PORT = process.env.PORT || 3000;
// for parsing application/json
connection.connect(function (error) {
  if (!!error) console.log(error);
  else console.log("Database Connected!");
});

//set views file
app.set("views", path.join(__dirname, "views"));

//set view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
  let sql = "SELECT * FROM course";
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.render("courseIndex", {
      title: "CRUD Operation using NodeJS / ExpressJS / MySQL",
      users: rows,
    });
  });
});

app.get("/add", (req, res) => {
  res.render("courseAdd", {
    title: "CRUD Operation using NodeJS / ExpressJS / MySQL",
  });
});

app.post("/save", (req, res) => {
  console.log(req.body);
  const cid = req.body.cid;
  const cname = req.body.cname;
  const dname = req.body.dname;
  const iname = req.body.iname;
  const uname = req.body.uname;

  const dbInsert = `INSERT INTO course (cid,cname,dname,iname,uname) VALUES ("${cid}","${cname}","${dname}","${iname}","${uname}")`;
  connection.query(dbInsert, (err, result) => {
    if (err) throw err;
    console.log(`Total affected ROWS: ${result["affectedRows"]}`);
    res.redirect("/");
  });
});

app.get("/edit/:userId", (req, res) => {
  const userId = req.params.userId;
  let sql = `Select * from course where id = ${userId}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.render("courseEdit", {
      title: "CRUD Operation using NodeJS / ExpressJS / MySQL",
      user: result[0],
    });
  });
});

app.post("/update", (req, res) => {
  const userId = req.body.id;
  let sql =
    "update course SET cid='" +
    req.body.cid +
    "', cname='" +
    req.body.cname +
    "',  dname='" +
    req.body.dname +
    "', iname='" +
    req.body.iname +
    "', uname='" +
    req.body.uname +
    "' where id =" +
    userId;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/delete/:userId", (req, res) => {
  const userId = req.params.userId;
  let sql = `DELETE from course where id = ${userId}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Server Listening
app.listen(PORT, () => {
  console.log("Server is running at port ", PORT);
});
