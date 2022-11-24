const gameData = require('../models/gameData');
var playerList = gameData.gameInfo.players;
var chooseProf = "<h2>Choose who you would like to be!</h2>"
+ "<ol id= \"options\">"
+ "<li id= \"option\">Be a banker from Boston</li>"
+ "<li id= \"option\">Be a carpenter from Ohio</li>"
+ "<li id= \"option\">Be a farmer from Illinios</li>"
+ "<li id= \"option\">Find out the differences between the choices</li>"
+ "</ol>";
var chooseLeadName = "<label for=\"prompt\" id=\"inputlabel\" >What is your name ?</label>"
+ "<input type=\"text\" id=\"prompt\" />";
var chooseMonth = "<label for=\"monthInput\" id=\"monthInputLabel\">Enter your preferred starting month</label>"
+ "<input  type=\"text\" id=\"monthInput\" />";
var summary = "<p>Summary</p>"; 
var explanation = "<p id=\"explain\">If you choose Banker you will start off with $2000</p>"
+ "<p id=\"explain\">If you choose Carpenter you will start off with $1800</p>"
+ "<p id=\"explain\">If you choose Farmer you will start off with $1500</p>";
var screens = [chooseProf, chooseLeadName, chooseMonth, summary, explanation];


exports.getSetupScreen = function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send(screens[req.params.id]);  
}


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

