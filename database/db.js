const mysql = require("mysql2"); // Connect to the DB

// Create the pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "mentor_view",
});

// Get a Promise wrapped instance of that pool
const promisePool = pool.promise();

module.exports = promisePool;