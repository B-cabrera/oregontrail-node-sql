const mysql = require('mysql2');

// HOLDS ONE TOP SCORE, NAME, AND POINTS
class TopScore {
    constructor(who, day, points) {
        this.name = who;
        this.date = day;
        this.score = points;
    }
}

module.exports.TopScore = TopScore;
 
// Make connection to database
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'oregontraildb'
})


exports.getScores = function getScores() {

    return new Promise(function (resolve) {

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
        
                result.forEach((record) => {
                    // Only getting the top ten
                    allscores.push(new TopScore(record.name, record.date.toLocaleDateString("en-US"), record.points))
                })
                
                resolve(allscores);
    
                
            })
        })

    })

    
}

exports.addScore = function addScore (tScore) {
    db.connect((err) => {
        if (err) throw err;

        var line = `INSERT INTO topscores(name, date, points) VALUE ("${tScore.name}", "${tScore.date}", ${tScore.score})`;

        db.query(line, (err, result) => {
            if (err) console.log(err);

            return result;
        })
    })
}