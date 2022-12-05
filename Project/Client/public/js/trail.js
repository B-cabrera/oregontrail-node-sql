

function checkForSetup() {
    if (sessionStorage.isSetup == 'false') {
        window.location = '/setup';
    }  
}

checkForSetup();

// On window load, get game data to fill out fields, place wagon
window.addEventListener('load', displayInfo);
window.addEventListener('load', placeWagon);

var wagon = new Image(80,50)
wagon.src = '/images/dark-brown-wagon.png';
wagon.id = 'wagon';

// moveWagon(300);


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


// Puts wagon on page positions it on line
function placeWagon() {

    // Add to page
    document.body.appendChild(wagon);

    // Get position details of line represent the trail
    var linePosition  = document.getElementById('travel-line').getBoundingClientRect();

    // Set Wagon picture on top of line
    wagon.style.top = `${linePosition.top}px`;
}

// Moves wagon to the right (num) pixels
function moveWagon(num) {
    
    // Get wagon x position or "left"
    var wagonLeft = wagon.getBoundingClientRect().left;

    // Set new left to previous left + num
    wagon.style.left = `${wagonLeft + num}px`
}





