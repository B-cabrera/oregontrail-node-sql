const topscores = require('../models/topTen');


// Responds with top ten array
exports.getTopTen = function(req, res) {

    topscores.getScores().then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log(error);
    })
}

/* Takes info from req, creates new top score obj with info, then adds to top point array
Responds with updated top ten list */
exports.addNewScore = function(req, res) {
    console.log(req.body.name, req.body.date, req.body.score);

    var score = new topscores.TopScore(req.body.name, req.body.date, req.body.score);
    console.log(score)


    topscores.addScore(score);
    res.setHeader('Content-Type','text/plain');
    res.send(topscores);
}