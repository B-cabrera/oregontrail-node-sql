const gameData = require('../models/gameData');
var playerList = gameData.gameInfo.players;

// Gets player obj in player array using ID from req, responds with player name and profession
exports.getPlayerInfo = function(req, res) {
    var playerInfo = [playerList[req.params.id - 1].name, playerList[req.params.id - 1].profession];
    res.setHeader('Content-Type','text/plain');
    res.send(playerInfo);
}

// For each loop through player array, storing names in new playerNames array, responds with playerName array
exports.getPlayerNames = function(req, res) {
    var playerNames = [];

    playerList.forEach((player) => {
        playerNames.push(player.name);
    });

    res.setHeader('Content-Type','text/plain');
    res.send(playerNames);
}

// Sets player profession using profession given in req, responds with player info
exports.setProfession = function (req, res) {
    playerList[0].profession = req.body.profession;
    res.setHeader('Content-Type','text/plain');
    res.send(playerList[0]);
}

