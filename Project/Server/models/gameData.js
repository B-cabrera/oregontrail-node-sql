class gameData {
    constructor() {
        var players = [];
        var totalMoney = calcMoney();
        var startMonth;
        var miles;
        var groupHealth = new GroupHealth();
        var totalDays;
        var currentPace;
        var currentWeather;
        var currentTerrain;
        var messages = [];

    }
}


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

class Player {

    constructor(playerName, playerStatus, playerProfession, cash) {
        this.name = playerName;
        this.status = playerStatus;
        this.proffession = playerProfession;
        this.money = cash;
    }
}