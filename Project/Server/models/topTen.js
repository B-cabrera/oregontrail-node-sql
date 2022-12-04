const mysql = require('mysql2');

// HOLDS ONE TOP SCORE, NAME, AND POINTS
class TopScore {
    constructor(who, day, points) {
        this.name = who;
        this.date = day;
        this.score = points;
    }
}


// Holds an array of TopScore obj's
class TopTen {

    // Value passed should be array of topscore objects
    constructor(scores) {

        // Example list
        this.topPoints = [new TopScore('Brenden', new Date().toDateString(), 1000)];
    }



}

 
// Make connection to database
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'oregontraildb'
})

// Connect to the database
db.connect((err) => {
    if (err) {
        console.log(err);
    }

    // Query and get scores ordered by score
    db.query('SELECT * FROM TopScores ORDER BY points DESC', (err, result) => {
        if (err) {
            console.log(err);
        }

        var allscores = [];

        result.forEach((record, index) => {
            // Only getting the top ten
            if (index < 10)
                allscores.push(new TopScore(record.name, record.date.toLocaleDateString("en-US"), record.points))
        })

        exports.topScores = allscores;
    })
})
