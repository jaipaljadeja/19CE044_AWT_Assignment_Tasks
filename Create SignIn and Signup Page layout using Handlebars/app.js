const express = require("express");
const exhbs = require("express-handlebars");
const http = require("http");
const helmet = require("helmet");

const app = express();

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

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home", { title: "Jaipal Jadeja" });
});

app.get("/signin", (req, res) => {
  res.render("signin", { title: "Signin Page" });
});

app.get("/signup", function (req, res) {
  res.render("signup", { title: "Signup Page" });
});

//if user routes to any random or other than mentioned above it will give 404 error
app.get("/*", (req, res) => {
  res.writeHead(404);
  res.end();
});

//create server
const server = http.createServer(app);

//listen on port
server.listen(80, () => {
  console.log("server is listening on port 80");
});
