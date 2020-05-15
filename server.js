const exphbs = require("express-handlebars");
const config = require("./config/connectDB");
const express = require("express");
const mysql = require("mysql");
const app = express();

const PORT = process.env.PORT || 8080;

const dbConfig = process.env.NODE_ENV === "production" ? config.heroku : config.local;

const connection = mysql.createConnection(dbConfig);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// =============================================================================

// mysql.connection(dbConfig.local)
console.log(dbConfig.local);

app.get("/", (req, res) => {
  connection.query("SELECT * FROM snippets", (err, data) => {
    if (err) {
      throw err;
    }
    res.render("index", { snippets: data });
  });
});

// app.post("/", (req, res) => {
//   connection.query(
//     "INSERT INTO snippets SET ?",
//     {
//       snippetTitle: req.body.newTitle
//     },
//     {
//       language: req.body.newLanguage
//     },
//     {
//       description: req.body.newDescription
//     },
//     {
//       snippetBody: req.body.newSnippetBody
//     },
//     (err, res) =>{
//       if (err){
//         return res.status(500).end();
//       }
//     }
//   );
//   res.redirect("/");
// });

// PORT listener
app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});
