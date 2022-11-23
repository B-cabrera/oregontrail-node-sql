const pace = require('./pace');
const weather = require('./weather');
const terrain = require('./terrain');

class Player {

    // Player has a name, status (alive or dead), profession, and money
    constructor(playerName, playerStatus, playerProfession, cash) {
        this.name = playerName;
        this.status = playerStatus;
        this.profession = playerProfession;
        this.money = cash;
    }
}

// Group Health just has group health number, and method to get chance of death
class GroupHealth {

    constructor(hp) {
        this.health = hp;
    }


    getDeathChance() {
        if (this.health >= 80 || (this.health < 80 && this.health >= 50))
            return 0;
        else if (this.health < 50 && this.health >= 20)
            return 0.03;
        else if (this.health < 20 && this.health > 0)
            return 0.1;
        else if (this.health === 0)
            return 1;

    }
}

// Data for game
class GameData {

    /*
    players: list of players
    totalMoney: num representing total money group has
    startMonth: Month game begins on
    miles: num tracking current miles
    groupHealth: GroupHealth obj tracking group health
    totalDays: num tracking days on trail
    currentPace: var tracking current pace of game, uses Pace obj
    currentWeather: var tracking current weather of game, uses Weather obj
    currentTerrain: var tracking current terrain of game, uses Terrain obj
    messages: array holding game messages
    */

    constructor() {
        this.players = [];
        this.totalMoney = this.calcMoney();
        this.startMonth = 0;
        this.miles = 0;
        this.groupHealth = new GroupHealth(100);
        this.totalDays = 0;
        this.currentPace = pace.Pace.createPaceList()[0].name;
        this.currentWeather = weather.Weather.createWeatherList()[0].weather;
        this.currentTerrain = terrain.Terrain.createTerrainList()[1].terrain;
        this.messages = [];

    }

    // Method that will traverse through player array and add up money
    calcMoney() {
        return 0;
    }

}

// EXPORTING INSTANCE OF OBJ
var thisGame = new GameData();

exports.gameInfo = thisGame;







