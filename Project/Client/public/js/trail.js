

function checkForSetup() {
    if (sessionStorage.isSetup == 'false') {
        window.location = '/setup';
    }  
}

checkForSetup();

/* <p class="days-text">Days on trail</p>
<p class="miles-text">Miles traveled</p>
<p class="health-text">Party health status</p>
<p class="weather-text">Current weather</p>
<p class="pace-text">Current pace</p>
<p class="terrain-text">Current terrain</p>
<p class="alive-text"># of party members alive</p> */

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
deadList: list of all dead players;
messages: array holding game messages
*/

// On window load, get game data to fill out fields
window.addEventListener('load', displayInfo)


function displayInfo() {
    // Fetch to get all game data
    fetch('/api/gameData').then((res) => {
        return res.json();
    }).then((data) => {
        // Getting all elements        
        var daysElement = document.getElementById("days-text");
        var milesElement = document.getElementById('miles-text');
        var healthElement = document.getElementById('health-text');
        var weatherElement = document.getElementById('weather-text');
        var paceElement = document.getElementById('pace-text');
        var terrainElement = document.getElementById('terrain-text');
        var aliveElement = document.getElementById('alive-text');


        // Displaying all info with fetch result
        daysElement.textContent = `Days on trail: ${data.totalDays}`;
        milesElement.textContent = `Miles traveled: ${data.miles}`;
        healthElement.textContent = `Party Health: ${data.groupHealth.health}`;
        weatherElement.textContent = `Current Weather: ${data.currentWeather}`;
        paceElement.textContent = `Current Pace: ${data.currentPace}`;
        terrainElement.textContent = `Current Terrain: ${data.currentTerrain}`;
        aliveElement.textContent = `# of party members alive: ${data.players.length}`;

    })
}

