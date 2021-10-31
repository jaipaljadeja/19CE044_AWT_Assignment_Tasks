const express = require("express");
const exhbs = require("express-handlebars");
const http = require("http");
const helmet = require("helmet");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Subject",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected successfully to MySql server");
});

app.get("/db-create", (req, res) => {
  const dbquery = "CREATE DATABASE IF NOT EXISTS Subject";

  connection.query(dbquery, (err, result) => {
    if (err) throw err;
    console.log("Database created successfully", result);
  });
});

//db-table => Create Table in University DB
app.get("/db-table", (req, res) => {
  const dbtable = `CREATE TABLE IF NOT EXISTS subjectInfo(
      subjectCode varchar(10) NOT NULL,
      subjectName varchar(50) NOT NULL,
      instituteName varchar(50) NOT NULL,
      deptName varchar(50) NOT NULL,
      sem integer NOT NULL,
      PRIMARY KEY (subjectCode))`;
  connection.query(dbtable, (err, result) => {
    if (err) throw err;
    console.log("Table created successfully", result);
  });
  // });
});

app.engine(
  "hbs",
  exhbs({
    defaultLayout: "main", //main handlebar should be displayed when first my   website will be loaded
    extname: ".hbs", //we can change extension using extname flags..so here  we'll write .hbs extension which we r going to use
  })
);

app.set("view engine", "hbs");

app.use(helmet());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("form");
});

app.post("/", (req, res) => {
  var subjectCode = req.body.subject_code;
  var subjectName = req.body.subject_name;
  var instituteName = req.body.inst_name;
  var departmentName = req.body.dept_name;
  var semester = req.body.sem;

  console.log(req.body);

  var sql = `INSERT INTO subjectInfo (subjectCode, subjectName, instituteName, deptName, sem) VALUES ("${subjectCode}", "${subjectName}", "${instituteName}", "${departmentName}","${semester}")`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    res.render("showdata", { data: req.body });
  });
});

app.use((req, res, next) => {
  res.render("404");
});
//create server
const server = http.createServer(app);

//listen on port
server.listen(80, () => {
  console.log("server is listening on port 80");
});
