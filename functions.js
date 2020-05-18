module.exports = {
    //Selects everything in a table
    selectAll : function(connection, TABLE) {
        return new Promise(function(resolve,reject){
            connection.query(`SELECT * FROM ${TABLE};`, function(err, data) {
            if (err) {
              throw err;
            }
            resolve(data);
        });
    });
    },
    //Conditionally Selects
    selectWhereEqual : function(connection, TABLE, condition, pass) {
        return new Promise(function(resolve,reject){
            connection.query(`SELECT * FROM ${TABLE} WHERE ${condition} = ${pass};`, function(err, data) {
            if (err) {
              throw err;
            }
            resolve(data);
        });
    });
    },
    //Delete function
    DeleteWhereEqual : function(connection, TABLE, condition, pass) {
        return new Promise(function(resolve,reject){
        connection.query(`DELETE * FROM ${TABLE} WHERE ${condition} = ${pass};`, function(err, data) {
            if (err) {
              throw err;
            }
            resolve(data);
        });
    });
    },
    //Update function
    UpdateWhereEqual : function(connection, TABLE, condition, pass, pre, post) {
        return new Promise(function(resolve,reject){
        connection.query(`UPDATE * ${TABLE} SET ${pre} = ${post} WHERE ${condition} = ${pass};`, function(err, data) {
            if (err) {
              throw err;
            }
            resolve(data);
        });
    });
    },
    //These two functions select everything from a table but order by either asc or desc
    selectAllOrder : function(connection, TABLE, orderCondition, AscOrDesc) {
        return new Promise(function(resolve,reject){
        connection.query(`SELECT * FROM ${TABLE} ORDER by ${orderCondition} ${AscOrDesc};`, function(err, data) {
            if (err) {
              throw err;
            }
            resolve(data);
        });
    });
    },
    //These two can be used for two filters at once, filtering a field and sorting by time
    selectWhereEqualOrder : function(connection, TABLE, condition, pass, orderCondition, AscOrDesc) {
        return new Promise(function(resolve,reject){
        connection.query(`SELECT * FROM ${TABLE} WHERE ${condition} = ${pass} ORDER by ${orderCondition} ${AscOrDesc};`, function(err, data) {
            if (err) {
              throw err;
            }
            resolve(data);
        });
    });
    },
    selectWhereEqualOrderAsc : function(connection, TABLE, condition, pass, orderCondition) {
        return new Promise(function(resolve,reject){
        connection.query(`SELECT * FROM ${TABLE} WHERE ${condition} = ${pass} ORDER by ${orderCondition} asc;`, function(err, data) {
            if (err) {
              throw err;
            }
            resolve(data);
        });
    });
    },
    selectWhereEqualOrderDesc : function(connection, TABLE, condition, pass, orderCondition) {
        return new Promise(function(resolve,reject){
        connection.query(`SELECT * FROM ${TABLE} WHERE ${condition} = ${pass} ORDER by ${orderCondition} desc;`, function(err, data) {
            if (err) {
              throw err;
            }
            resolve(data);
        });
    });
    },
    //Adds a new tag to the tags table
    makeNewTag : function(connection, tagName){
        //`INSERT INTO tags (tagName) VALUES (${tagName});`
        connection.query(`INSERT INTO tags (tagName) VALUES (${tagName});`, function(err, data) {
            if (err) {
              throw err;
            }
        })
    },
    //Returns the first tagID that matches a given tag name
    getTagIDFromName : async function(connection, SearchedTagName){ //THIS FUNCTION IS COMPLETED
        return new Promise(async function(resolve, reject){
            const returnedData = await selectWhereEqual(connection, "tags", "tagName", SearchedTagName)
            const returnedTagID = returnedData[0].id
            resolve(returnedTagID)
            })
    },
    //Tags Handling Functions
    addTagtoSnippet : async function(connection, addTagName, addSnippetID ){
        return new Promise(async function(resolve, reject){
        //Check if the tag already exists, //if not then make a new tag
        const tagExistData = await selectWhereEqual(connection, "tags", "tagName", `"${addTagName}"`)
        if (tagExistData !== []) {} //if the tag does exist then do nothing
        //else make a new tag
        else {
        makeNewTag(connection, `"${addTagName}"`)
        }
        //grab either the previously found tag's id or the newly created tag's id
        const addTagID = getTagIDFromName(connection, addTagName); 
        //check if the snippet has this tag
        const linkExistData =  await selectWhereEqual(connection, "LinkingTable", "addSnippetID", `"${addSnippetID}"`);
        let alreadyHasTag = false;
        for (entry of linkExistData){
            if (linkTagID === addTagID){
                alreadyHasTag = true;
            }
        }
        if (alreadyHasTag){}
        //if the snippet does not have this tag, then add the tag to the snippet
        else {
        const query =`INSERT INTO linkingTable (linkSnippetID, linkTagID) VALUES (${addSnippetID}, ${addTagID});`
        }
        });
    },

}



