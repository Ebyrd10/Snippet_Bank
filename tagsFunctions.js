const selectWhereEqual = function (connection, TABLE, condition, pass) {
    return new Promise(function (resolve, reject) {
        connection.query(`SELECT * FROM ${TABLE} WHERE ${condition} = ${pass};`, function (err, data) {
            if (err) {
                throw err;
            }
            resolve(data);
        });
    });
}

//Adds a new tag to the tags table
const makeNewTag = function (connection, tagName) {
    connection.query(`INSERT INTO tags (tagName) VALUES (${tagName});`, function (err, data) {
        if (err) {
            throw err;
        }
    })
}
//Returns the first tagID that matches a given tag name
const getTagIDFromName = async function (connection, SearchedTagName) {
    return new Promise(async function (resolve, reject) {
        const returnedData = await selectWhereEqual(connection, "tags", "tagName", `"${SearchedTagName}"`)
        const returnedTagID = returnedData[0].id
        resolve(returnedTagID)
    })
}
//Tags Handling Functions
const addTagtoSnippet = async function (connection, addTagName, addSnippetID) {
    return new Promise(async function (resolve, reject) {
        //Check if the tag already exists, //if not then make a new tag
        const tagExistData = await selectWhereEqual(connection, "tags", "tagName", `"${addTagName}"`)
        if (tagExistData == []) { } //if the tag does exist then do nothing
        //else make a new tag
        else {
            makeNewTag(connection, `"${addTagName}"`)
        }
        //grab either the previously found tag's id or the newly created tag's id
        const addTagID = await getTagIDFromName(connection, addTagName);
        //check if the snippet has this tag
        const linkExistData = await selectWhereEqual(connection, "LinkingTable", "linkSnippetID", `"${addSnippetID}"`);
        let alreadyHasTag = false;
        for (entry of linkExistData) {
            if (entry.linkTagID === addTagID) {
                alreadyHasTag = true;
            }
        }
        if (alreadyHasTag) { }
        //if the snippet does not have this tag, then add the tag to the snippet
        else {
            const query = `INSERT INTO linkingTable (linkSnippetID, linkTagID) VALUES (${addSnippetID}, ${addTagID});`
            connection.query(query, function (err, data) {
                if (err) {
                    throw err;
                }
            })
        }
    });
}

  //example for how to add a tag name to a snippet ID
  // addTagtoSnippet(connection, "My Name Tag is Purple", 3);

  module.exports = {
      addTagtoSnippet
  };