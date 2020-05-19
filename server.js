const exphbs = require("express-handlebars");
const config = require("./config/connectDB");
const express = require("express");
const mysql = require("mysql");
const app = express();

//Importing custom tag database manipulate functions
const tagsManipulate = require("./tagsFunctions")
//Example of how to use the function
//tagsManipulate.addTagtoSnippet(connection, "My Name Tag is Purple", 2);

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

var languages = {
  'c':'C',
  'csharp':'CSharp',
  'cplusplus':'C++',
  'css3':'CSS3',
  'html5':'HTML5',
  'javascript':'Javascript',
  'java':'Java',
  'python':'Python',
  'php':'PHP'
}

// =============================================================================

// mysql.connection(dbConfig.local)
// console.log(dbConfig.local);

app.get("/", (req, res) => {
  connection.query("SELECT * FROM snippets", (err, data) => {
    if (err) {
      throw err;
    }
    res.render("index", { snippets: data, languages:languages });
  });
});
//Alternative Version
// app.get("/", async (req, res) =>  {
//   const data = await functions.selectAll(connection, snippets)
//     res.render("index", { snippets: data });
//   });

app.delete("/api/delete/:snippetID", function (req, res) {
  connection.query(
    // Our intial sql statement with the wildcard
    "DELETE FROM snippets WHERE ?",
    // criteria for determining which records get deleted
    {
      id: req.params.snippetID
    },
    function (err, res) {
      if (err) throw err;
      // console.log(id + " deleted!\n")
    }
  );

  // console.log(req.params.snippetID);
});

app.post("/api/updates/", function (req, res) {
  // don't save empty values, should be null
  req = convertEmptyValuesToNull(req);

  connection.query(
    "UPDATE snippets SET snippetTitle = ?, language = ?, description = ?, snippetBody = ? WHERE ?",
    [
      req.body.title,
      req.body.language,
      req.body.description,
      req.body.body,
      {
        id: req.body.id,
      },
    ],
    function (errSave, saveData) {
      // if there is an error, return error, with different status
      if (errSave) {
        console.log("error on submit update");
        console.log(errSave);
        console.log(saveData);
        res.status(400);
        res.json(errSave);
        return res;
      } else {
        console.log(req.body.id + " " + req.body.title + " updated!\n");

        res.status(200);
        // needed for jquery done to work
        res.json(null);
        return res;
      }
    }
  );
});
function convertEmptyValuesToNull(req) {
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      // if value is empty delete or set to null
      if (!req.body[key].trim()) req.body[key] = null;
    }
  }
  return req;
}

app.post("/", (req, res) => {
  // don't save empty values, should be null
  req = convertEmptyValuesToNull(req);
  connection.query(
    {
      sql: `INSERT INTO snippets  
    (snippetTitle, language, description, snippetBody) 
    values(?,?,?,?)`,
      values: [
        req.body.newTitle,
        req.body.newLanguage,
        req.body.newDescription,
        req.body.newSnippetBody,
      ],
    },
    (errSave, newdata) => {
      if (errSave) {
        console.log("error on submit save");
        console.log(errSave);
        console.log(newdata);
        connection.query("SELECT * FROM snippets", (err, data) => {
          if (err) {
            throw err;
          }
          // if there is an error, return error, and also request
          res.render("index", {
            snippets: data,
            error: errSave,
            newSnippet: req.body,
            languages:languages
          });
        });
      } else res.redirect("/");
    }
  );
});

//Applies search on keyword phrases that appear in either snippetTitle or description
app.post("/api/search/", function (req, res) {
  const splitStrArr = req.body.searchField.split(" ");
  var query = `SELECT * FROM snippets WHERE `;
  for (var i = 0; i < splitStrArr.length; i++) {
    if (i == 0) {
      query += `snippetTitle LIKE '%${splitStrArr[i]}%'`;
    } else {
      query += ` AND snippetTitle LIKE '%${splitStrArr[i]}%'`
    }
  }

  for (var i = 0; i < splitStrArr.length; i++) {
    if (i == 0) {
      query += ` OR description LIKE '%${splitStrArr[i]}%'`
    } else {
      query += ` AND description LIKE '%${splitStrArr[i]}%'`
    }
  }
  connection.query(query, function (err, data) {
    if (err) throw err;

    res.render("index", { snippets: data, languages:languages });
  })
});




app.post("/api/:id", function (req, res) {
  connection.query(
    "SELECT * FROM snippets WHERE id=" + req.params.id,
    function (err, data) {
      if (err) throw err;
      // Log all results of the SELECT statement
      res.json(data);
    }
  );
});

//a filter route that just handles a specific query request
app.get("/api/filter/:query", function (req, res) {
  const query = req.params.query;
  connection.query(query, function (err, data) {
    if (err) throw err;
    res.render("index", { snippets: data, languages:languages });
  });
})

//an advanced filter control that manages the current language selection in additon to the overhaul query
app.get("/api/filter/:language/:query", function (req, res) {
  const query = req.params.query;
  connection.query(query, function (err, data) {
    if (err) throw err;
    res.render("index", { snippets: data, selectedLanguage: req.params.language, languages:languages });
  });
});

//Tag Api Routes
//DELETE
app.post("/api/deleteTag/:snippetID/:tagName", function (req, res) {
  const snippetID = req.params.snippetID;
  const tagName = req.params.tagName;
  tagsManipulate.DeleteTag(connection, tagName, snippetID);
});
//ADD
app.post("/api/addTag/:snippetID/:tagName", async function (req, res) {
  const snippetID = req.params.snippetID;
  const tagName = req.params.tagName;
  tagsManipulate.addTagtoSnippet(connection, tagName, snippetID);
  res.json(tagName);
  
});
//DISPLAY ALL TAGS FOR A SNIPPET
//when given a snippetID, returns an array of tag names associated with that snippet
app.post("/api/displayTags/:snippetID", async function (req, res) {
  const snippetID = req.params.snippetID;
  const tagArray = await tagsManipulate.getAllTagsofSnippet(connection, snippetID);
  //sends the tag array back to page
  res.json(tagArray);
});



// PORT listener
app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});


tagsManipulate.DeleteTag(connection, "Apple", 3)