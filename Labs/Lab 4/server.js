var mysql = require('mysql');
const process = require('process');
const args = process.argv.slice(2);
let command = args[0];
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cmpt221"
});
var sql = "";
if (command === 'add') {
    console.log('Add record');
    // Make sure there are two additional arguments for name and address
    if (args.length < 3) {
        console.log("Invalid number of arguments for add");
        con.end();
        process.exit(1);
    }
    let name = args[1];
    let address = args[2];
    // Build the correct SQL
    // sql =
} else if (command === 'find') {
    // Make sure there is one additional argument for name
    if (args.length < 2) {
        console.log("Invalid number of arguments for find");
        con.end();
        process.exit(1);
    }
    console.log("Find record");
    // Code to read parameter and get from DB
    // sql =
} else if (command === 'remove') {
    // Make sure there is one additional argument for name
    if (args.length < 2) {
        console.log("Invalid number of arguments for remove");
        con.end();
        process.exit(1);
    }
    console.log("Remove record");
    // Code to read parameter and get from DB
    // sql =
} else
    console.log("Invalid command " + command);

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("result: " + result);
        con.end();
    });
});