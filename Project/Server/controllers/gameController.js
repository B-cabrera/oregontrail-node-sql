const gameData = require('../models/gameData');
const pace = require('../models/pace');
const weather = require('../models/weather');
const terrain = require('../models/terrain');

// Responds with gameData info as JSON version of gameData obj
exports.getGameData = function(req, res) {
    res.setHeader('Content-Type','text/plain');
    res.send(gameData.gameInfo);
}

// Assigns current pace to pace given through req, then responds with updated current pace
exports.changePace = function(req, res) {
    gameData.gameInfo.currentPace = pace.Pace.createPaceList()[req.params.id];
    res.setHeader('Content-Type','text/plain');
    res.send(gameData.gameInfo.currentPace)
}

// Responds with current pace
exports.getPace = function(req, res) {
    res.setHeader('Content-Type','text/plain');
    res.send(gameData.gameInfo.currentPace);
}

// Sets pace to first in pace array (Steady) then responds with current pace
exports.resetPace = function(req, res) {
    gameData.gameInfo.currentPace = pace.Pace.createPaceList()[0];
    res.setHeader('Content-Type','text/plain');
    res.send(gameData.gameInfo.currentPace);
}

// Responds with current weather
exports.getWeather = function(req, res) {
    res.setHeader('Content-Type','text/plain');
    res.send(gameData.gameInfo.currentWeather);
}

// Changes current weather to weather with id given in req, responds with current weather
exports.changeWeather = function(req, res) {
    gameData.gameInfo.currentWeather = weather.Weather.createWeatherList()[req.params.id];
    res.setHeader('Content-Type','text/plain');
    res.send(gameData.gameInfo.currentWeather);
}
 
// Sets weather to first in weather array (Clear), then responds with current weather
exports.resetWeather = function(res, req) {
    gameData.gameInfo.currentWeather = weather.Weather.createWeatherList()[0];
    res.setHeader('Content-Type','text/plain');
    res.send(gameData.gameInfo.currentWeather);
}

// Responds with current health
exports.getHealth = function(req, res) {
    res.setHeader('Content-Type','text/plain');
    res.send("" + gameData.gameInfo.groupHealth.health);
}

exports.getTerrain = (req, res) => {
    res.setHeader('Content-Type','text/plain');
    res.send(gameData.gameInfo.currentTerrain);
}

exports.changeTerrain = (req, res) => {
    gameData.gameInfo.currentTerrain = terrain.Terrain.createTerrainList()[req.params.id];
    res.setHeader('Content-Type','text/plain');
    res.send(gameData.gameInfo.currentTerrain);
}

exports.setMiles = (req, res ) => {
    
    gameData.gameInfo.miles = req.body.miles;
    res.setHeader('Content-Type','text/plain');
    res.send("" + gameData.gameInfo.miles);
}

exports.getMiles = (req, res) => {
    res.setHeader('Content-Type','text/plain');
    res.send("" + gameData.gameInfo.miles);
}

exports.addDay = (req, res) => {
    res.setHeader('Content-Type','text/plain');
    if (gameData.gameInfo.totalDays >= 45)
        res.send("max");
    else {
        gameData.gameInfo.totalDays++;
        res.send("ok");
    }
}

exports.setDay = (req, res ) => {
    
    gameData.gameInfo.totalDays = req.body.day;
    res.setHeader('Content-Type','text/plain');
    res.send("" + gameData.gameInfo.day);
}

exports.resetGame = (req, res) => {
    gameData.gameInfo.refresh();

    res.send("Game is reset!");
}

exports.addHealth = (req, res) => {
    gameData.gameInfo.groupHealth.health += req.body.health;

    if (gameData.gameInfo.groupHealth.health > 100)
        gameData.gameInfo.groupHealth.health = 100;
    else if (gameData.gameInfo.groupHealth.health <= 0) {
        gameData.gameInfo.groupHealth.health = 0;
    }

    res.send("" + gameData.gameInfo.groupHealth.health);
}