const extraFunctions = require ("./functions")

const getAllTagsofSnippet = async function (connection, snippetID) {
    return new Promise(async function (resolve, reject) {
        const tagArray = [];
        const tagArrayIDs = [];
        const returnedData = await extraFunctions.selectWhereEqual(connection, "LinkingTable", "linkSnippetID", `"${snippetID}"`)
        for (linkEntry of returnedData){
            tagArrayIDs.push(linkEntry.linkTagID)
        };
        //Alternatvie to the For Of loop above
        // for (i = 0; i < returnedData.length; i++){
        //     tagArrayIDs.push((returnedData[i].linkTagID))
        // }
        for (id of tagArrayIDs){
            const idofTag = id;
            const nameOfTag = await getTagNamefromID(connection, idofTag);
            tagArray.push(nameOfTag)
        };
        console.log(tagArray)
        resolve(tagArray)
    })
};

//Adds a new tag to the tags table
//This function should only be used in reference to the addTagtoSnippet function further below
const makeNewTag = function (connection, tagName) {
    connection.query(`INSERT INTO tags (tagName) VALUES (${tagName});`, function (err, data) {
        if (err) {
            throw err;
        }
    })
}
//Deletes a tag from the a snippet in the linking table, if the tag has no links at all then the tag is deleted from the tags table
const DeleteTag = function (connection, tagName, snippetID) {
    if (!snippetID) {
        console.log("Must have a snippet value inputed")
        return;
    }
    const tagID = getTagIDFromName(tagName)
    //First deletes the link between the snippet and the tab
    connection.query(`DELETE From linkingTable WHERE linkTagID = ${tagID} AND linkSnippetID = ${snippetID};`, function (err, data) {
        if (err) {
            throw err;
        }
    }).then(
        //then searches for all the total snippets that the tag is now associated with
        connection.query(`SELECT From linkingTable WHERE linkTagID = ${tagID};`, function (err, data) {
            if (data === []) {
                //if the tag is no longer associated with any tag, it is removed from the tags table
                connection.query(`DELETE From tags WHERE TagID = ${tagID};`, function (err, data) {
                    if (err) {
                        throw err;
                    }
                })
            };
            if (err) {
                throw err;
            };
        }))
}
//Returns the first tagID that matches a given tag name
const getTagIDFromName = async function (connection, SearchedTagName) {
    return new Promise(async function (resolve, reject) {
        const returnedData = await extraFunctions.selectWhereEqual(connection, "tags", "tagName", `"${SearchedTagName}"`)
        const returnedTagID = returnedData[0].id
        resolve(returnedTagID)
    })
}
//Returns the first tagName that matches a given tag id
const getTagNamefromID = async function (connection, SearchedTagID) {
    return new Promise(async function (resolve, reject) {
        const returnedData = await extraFunctions.selectWhereEqual(connection, "tags", "id", `"${SearchedTagID}"`)
        const returnedTagName = returnedData[0].tagName
        resolve(returnedTagName)
    })
}
//functions that links a tag (currently existing or not) to an already existing snippet
const addTagtoSnippet = async function (connection, addTagName, addSnippetID) {
    return new Promise(async function (resolve, reject) {
        //Check if the tag already exists, //if not then make a new tag
        const tagExistData = await extraFunctions.selectWhereEqual(connection, "tags", "tagName", `"${addTagName}"`)
        console.log(tagExistData)
        if (tagExistData !== []) {} //if the tag does exist then do nothing
        //else make a new tag
        else {
            makeNewTag(connection, `"${addTagName}"`)
        }
        //grab either the previously found tag's id or the newly created tag's id
        const addTagID = await getTagIDFromName(connection, addTagName);
        //check if the snippet has this tag
        const linkExistData = await extraFunctions.selectWhereEqual(connection, "LinkingTable", "linkSnippetID", `"${addSnippetID}"`);
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
// addTagtoSnippet(connection, "My Name Tag is Blue", 3);

module.exports = {
    addTagtoSnippet,
    DeleteTag,
    getAllTagsofSnippet
};