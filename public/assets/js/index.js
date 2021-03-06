let selectedSnippet;
//Update Snippet Functionality
$("#updateSnippet").on("click", function (event) {
  $("#newSnippetArea").hide();
  $("#detailSnippetArea").show();
  $("#detailTitle").val($("#bodyTitle").text());
  $("#detailLanguage").val($("#bodyLanguage").text());
  $("#detailDescription").val($("#bodyDescription").text());
  $("#detailSnippetBody").val($("#bodySnippetBody").text());

  $("#snippetCard").hide(function () {
    $("#saveUpdatedSnippet").show();
    $("#submitSnippet").hide();
  });
});

$("#deleteSnippet").on("click", function (event) {
  event.preventDefault();

  var snippetID = $("#bodyID").text();

  console.log(snippetID);

  $.ajax("/api/delete/" + snippetID, {
    type: "DELETE",
  }).done(location.reload("/"));
});

// Event handler for 
$("#saveUpdatedSnippet").on("click", function (event) {
  event.preventDefault();

  var snippetData = {
    id: $("#bodyID").text(),
    title: $("#detailTitle").val(),
    body: $("#detailSnippetBody").val(),
    language: $("#detailLanguage").val(),
    description: $("#detailDescription").val(),
  };
  console.log("updating snippet");
  console.log(snippetData);

  var request = $.ajax("/api/updates/", {
    type: "POST",
    data: snippetData,
  });

  request.done(function (data) {
    // console.log("success")
    // console.log(data)
    $("#error").hide();
    // no errors reload page
    location.reload("/");
  });

  request.fail(function (data) {
    // console.log("failure")
    // console.log(data)
    $("#error").show();
    $("#error").text(data.responseText);
  });
});

// Event handler for "Add New Snippet" button click
$("#addSnippet").on("click", function (event) {
  event.preventDefault();
  // Show the form for adding a character
  $("#newSnippetArea").show();
  $("#detailSnippetArea").hide();
  $("#snippetCard").hide();
  $("#submitSnippet").show();
});

$("li").on("click", function (event) {
  $("#snippetCard").show();
  $("#newSnippetArea").hide();
  const id = $(this).val();
  $.ajax({
    url: "api/" + id,
    method: "POST",
    //Send user back to homepage for refresh
  }).then(function (data) {
    // console.log("snippet data")
    // console.log(data)
    $("#bodyID").text(data[0].id);
    $("#bodyTitle").text(data[0].snippetTitle);
    $("#bodySnippetBody").text(data[0].snippetBody);
    $("#bodyLanguage").text(data[0].language);
    $("#bodyDescription").text(data[0].description);
    $("pre > code").each(function () {
      hljs.highlightBlock(this);
    });
  });
});



//Handling the currently selected language
const selectedLanguageConst = "{{ selectedLanguage }}";
  
//if there is a selected language then set the dropdown title to the selected option
$("#mainFilterTitle").text(`${selectedLanguageConst}`)
//safety logic to make sure that all is properly displayed if no langauge is currently selected
if (($("#mainFilterTitle").text() === "")||($("#mainFilterTitle").text() === "{{ selectedLanguage }}")){
  $("#mainFilterTitle").text("all")
}

//Event handler for the main dropdown
$(".ddLanguage").on("click", function (event) {
  //Sets the dropdown title to reflect the currently selected option
  $("#mainFilterTitle").text($(this).text())
  //if the option is all then make a seperate select all query
  if ($(this).text() === "all") {
    const query = "SELECT * FROM snippets;"
    $.ajax({
      url: `/api/filter/all/${query}`,
      method: "get"
    }).done(window.location.assign(`api/filter/all/${query}`))
  }
  else {
    //or else condtionally select from the database
    const query = `SELECT * FROM snippets WHERE language =` + `"${$(this).text()}"`
    console.log(query)
    $.ajax({
      url: `/api/filter/${$(this).text()}/${query}`,
      method: "get"
    }).then(window.location.assign(`/api/filter/${$(this).text()}/${query}`,))
  }
})


//Event handler for creationdate drop down
$(".ddCreationDate").on("click", function (event) {
  //if the filter is currently set to all then use a selectAll query

  if ($("#mainFilterTitle").text() === "all") {
    const query = "SELECT * FROM snippets ORDER by id " + `${$(this).attr('id')};`
    $.ajax({
      url: `/api/filter/all/${query}`,
      method: "get"
    }).then(window.location.assign(`/api/filter/all/${query}`))
  }
  else {
    //if the filter is not set to all then use a more selective query
    //Sorts by id in the table, where the actual HTML element supplies the asc or desc in the element id
  const query = `SELECT * FROM snippets WHERE language =` + `"${$("#mainFilterTitle").text()}"` + " ORDER by id " + `${$(this).attr('id')};`
    console.log(query)
    $.ajax({
      url: `/api/filter/${$("#mainFilterTitle").text()}/${query}`,
      method: "get"
    }).then(window.location.assign(`/api/filter/${$("#mainFilterTitle").text()}/${query}`,))

  }
});

