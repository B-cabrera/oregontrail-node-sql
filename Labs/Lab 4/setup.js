var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
    // Creates a schema named cmpt221
    con.query("CREATE DATABASE IF NOT EXISTS cmpt221", function (err, result) {
        if (err) throw err;
        console.log("Database created!");
    });
    // Creates a database table in the schema named users
    // This is the table that we will use to store the records
    var sql = "CREATE TABLE IF NOT EXISTS cmpt221.users " +
        "(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created!");
    });
    con.end();
});