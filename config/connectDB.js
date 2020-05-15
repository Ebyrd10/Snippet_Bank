var connection = null;

if (process.env.database) {
    local = {
    host: process.env.dbhost,

    // Your port; if not 3306
    port: process.env.dbport,

    // Your username
    user: process.env.dbuser,

    // Your password
    password: process.env.pw,
    database: process.env.database
  };
} else {
  var creds = require("../creds.json");

  local = {
    host: creds.host,

    // Your port; if not 3306
    port: creds.port,

    // Your username
    user: creds.user,

    // Your password
    password: creds.pw,
    database: creds.database
  };
}

module.exports = {
    local  
}
