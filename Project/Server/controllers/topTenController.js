const topscores = require('../models/topTen');


// Responds with top ten array
exports.getTopTen = function(req, res) {
    res.send(topscores);
}

/* Takes info from req, creates new top score obj with info, then adds to top point array
Responds with updated top ten list */
exports.addNewScore = function(req, res) {
    topten.topTen.topPoints.push(topten.topScore(req.body.name, req.body.date, req.body.score));
    res.setHeader('Content-Type','text/plain');
    res.send(topten.topTen.topPoints);
}