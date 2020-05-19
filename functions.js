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
    
}



