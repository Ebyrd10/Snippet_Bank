module.exports = {
    //Selects everything in a table
    selectAll : function(connection, TABLE) {
        connection.query(`SELECT * FROM ${TABLE};`, function(err, data) {
            if (err) {
              throw err;
            }
            return data;
        });
    },
    //Conditionally Selects
    selectWhereEqual : function(connection, TABLE, condition, pass) {
        connection.query(`SELECT * FROM ${TABLE} WHERE ${condition} = ${pass};`, function(err, data) {
            if (err) {
              throw err;
            }
            return data;
        });
    },
    //Delete function
    DeleteWhereEqual : function(connection, TABLE, condition, pass) {
        connection.query(`DELETE * FROM ${TABLE} WHERE ${condition} = ${pass};`, function(err, data) {
            if (err) {
              throw err;
            }
            return data;
        });
    },
    //Update function
    UpdateWhereEqual : function(connection, TABLE, condition, pass, pre, post) {
        connection.query(`UPDATE * ${TABLE} SET ${pre} = ${post} WHERE ${condition} = ${pass};`, function(err, data) {
            if (err) {
              throw err;
            }
            return data;
        });
    },
    //These two functions select everything from a table but order by either asc or desc
    selectAllAsc : function(connection, TABLE, orderCondition) {
        connection.query(`SELECT * FROM ${TABLE} ORDER by ${orderCondition} ASC;`, function(err, data) {
            if (err) {
              throw err;
            }
            return data;
        });
    },
    selectAllDesc : function(connection, TABLE, orderCondition) {
        connection.query(`SELECT * FROM ${TABLE} ORDER by ${orderCondition} DESC;`, function(err, data) {
            if (err) {
              throw err;
            }
            return data;
        });
    },
    //These two can be used for two filters at once, filtering a field and sorting by time
    selectWhereEqualOrderAsc : function(connection, TABLE, condition, pass, orderCondition) {
        connection.query(`SELECT * FROM ${TABLE} WHERE ${condition} = ${pass} ORDER by ${orderCondition} ASC;`, function(err, data) {
            if (err) {
              throw err;
            }
            return data;
        });
    },
    selectWhereEqualOrderDesc : function(connection, TABLE, condition, pass, orderCondition) {
        connection.query(`SELECT * FROM ${TABLE} WHERE ${condition} = ${pass} ORDER by ${orderCondition} DESC;`, function(err, data) {
            if (err) {
              throw err;
            }
            return data;
        });
    },
}