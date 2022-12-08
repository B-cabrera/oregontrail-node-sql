const weather = require('./weather');
const terrain = require('./terrain')

class Events {



    constructor() {
        this.active = true;
    }


    // Get a change, either weather, terrain, or no change
    getChange() {
                

        var randNum = Math.random();
        
        if (randNum < 0.4) // Terrain Change (40% prob)
            // Send an array with 1 as the first element, and terrain as second
            // The one will be used to determine what change came back
            return [1, this.getRandTerrain()];
        else if (randNum < 0.8) // Weather Change (40% prob)
            return [2, this.getRandWeather()];
        else // Both change (20% prob)
            return [3, this.getRandWeather(), this.getRandTerrain()];
    }

    getRandWeather() {
        var weatherList = weather.Weather.createWeatherList();
        var randNum = Math.random();
        var weathers = [];
        var prob = 0;
        console.log(randNum);


        if (randNum <= 0.01) { // 1 percent prob
            prob = 0.01 
        }else if (randNum > 0.01 && randNum <= 0.03) { // Exceptions because probabilites dont add up to 100%
            return this.getRandWeather();
        } else if (randNum > 0.03 && randNum <= 0.05) { // 2 percent prob
            prob = 0.02;
        } else if (randNum > 0.05 && randNum <= 0.1) {// 5 percent prob
            prob = 0.05;
        } else if (randNum > 0.1 && randNum <= 0.2) { // 10 percent prob
            prob = .1;
        } else if (randNum > 0.2 && randNum <= 0.5) { // 30 percent chance
            prob = 0.3;
        } else { // FROM .5 and up, 50% percent chance
            prob = 0.5;
        }

        weatherList.forEach((weather) => {
            if (weather.chance == prob)
                weathers.push(weather);
        })

        return weathers[Math.floor(Math.random() * weathers.length)];
        
    }

    getRandTerrain() {
        var terrainList = terrain.Terrain.createTerrainList();
        var randNum = Math.floor(Math.random() *  5)


        return terrainList[randNum];
    }

}


module.exports = Events;