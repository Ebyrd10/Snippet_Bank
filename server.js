const exphbs = require("express-handlebars");
const config = require("./config/connectDB");
const express = require("express");
const mysql = require("mysql");
const app = express();

const PORT = process.env.PORT || 8089;

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
// console.log(dbConfig.local);

app.get("/", (req, res) => {
  connection.query("SELECT * FROM snippets", (err, data) => {
    if (err) {
      throw err;
    }
    res.render("index", { snippets: data });
  });
});
//Alternative Version
// app.get("/", async (req, res) =>  {
//   const data = await functions.selectAll(connection, snippets)
//     res.render("index", { snippets: data });
//   });
app.post("/api/updates/", function(req, res) {

  connection.query(
    "UPDATE snippets SET ? WHERE ?",
    [
      {
        snippetTitle: req.body.title,
        snippetBody: req.body.body,
        language: req.body.language,
        description: req.body.description,
      },
      {
        id: req.body.id,
      },
    ],
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");

    }
  );


  console.log(req.body)

  // connection.query("INSERT INTO plans (plan) VALUES (?)", [req.body.snippetData], function(err, result) {
  //   if (err) {
  //     return res.status(500).end();
  //   }

  //   // Send back the ID of the new plan
  //   // res.json({ id: result.insertId });
  //   console.log({ id: result.insertId });
  // });
});
function convertEmptyValuesToNull(req) {
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      // if value is empty delete or set to null
      if (!req.body[key])
        req.body[key] = null
    }
  }
  return req
}

app.post("/", (req, res) => {
  // don't save empty values, should be null
  req = convertEmptyValuesToNull(req);
  connection.query({
    sql: `INSERT INTO snippets  
    (snippetTitle, language, description, snippetBody) 
    values(?,?,?,?)`,
    values: [req.body.newTitle, req.body.newLanguage, req.body.newDescription, req.body.newSnippetBody]
  },
    (errSave, newdata) => {
      if (errSave) {
        console.log("error on submit")
        console.log(errSave)
        console.log(newdata)
        connection.query("SELECT * FROM snippets", (err, data) => {
          if (err) {
            throw err;
          }
          // if there is an error, return error, and also request
          res.render("index", { snippets: data, error: errSave, newSnippet: req.body });
        });
      } else
      res.redirect("/");
    }
  );
});

app.post("/api/:id", function (req, res) {
  connection.query("SELECT * FROM snippets WHERE id=" + req.params.id, function (err, data) {
    if (err) throw err;
    // Log all results of the SELECT statement
    res.json(data);
  });
});

// PORT listener
app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});
