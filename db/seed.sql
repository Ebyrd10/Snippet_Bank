USE snippetsDB;

INSERT INTO snippets (snippetTitle, snippetBody, description, language) 
VALUES ("AJAX Call", '$.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(response.Runtime);
    });', "An AJAX call using the GET method", "Javascript");