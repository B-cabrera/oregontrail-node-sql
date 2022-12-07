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
    gameData.gameInfo.currentPace = pace.Pace.createPaceList()[req.params.id].name;
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
    gameData.gameInfo.currentPace = pace.Pace.createPaceList()[0].name;
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
    gameData.gameInfo.currentWeather = weather.Weather.createWeatherList()[req.params.id].weather;
    res.setHeader('Content-Type','text/plain');
    res.send(gameData.gameInfo.currentWeather);
}
 
// Sets weather to first in weather array (Clear), then responds with current weather
exports.resetWeather = function(res, req) {
    gameData.gameInfo.currentWeather = weather.Weather.createWeatherList()[0].weather;
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
    gameData.gameInfo.currentTerrain = terrain.Terrain.createTerrainList()[req.params.id].terrain;
    res.setHeader('Content-Type','text/plain');
    res.send(gameData.gameInfo.currentTerrain);
}

exports.setMiles = (req, res ) => {
    
    gameData.gameInfo.miles = req.body.miles;

    res.send("" + gameData.gameInfo.miles);
}