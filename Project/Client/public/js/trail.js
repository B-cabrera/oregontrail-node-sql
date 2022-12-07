var wagon = new Image(80, 50)
wagon.src = '/images/misc/dark-brown-wagon.png';
wagon.id = 'wagon';


// Dict to have image source as val with terrain as key
var imageTerrainDict = {
    'Grassland': '/images/terrain/grassland.jpg',
    'Mountains': '/images/terrain/mountains.jpg',
    'Plains': '/images/terrain/plains.jpg',
    'Forest': '/images/terrain/forest.jpg',
    'Desert': '/images/terrain/desert.jpg'
};

// Dicto to have image source as val with weather as key
var imageWeatherDict = {
    'Clear': '/images/weather/clear-sky.jpg',
    'Cloudy': '/images/weather/cloudy.jpg',
    'Rain': '/images/weather/rain.jpg',
    'Heavy Rain': '/images/weather/heavy-rain.jpg',
    'Fog': '/images/weather/fog.jpg',
    'Heavy Fog': '/images/weather/heavy-fog.jpg',
    'Snow': '/images/weather/snow.jpeg',
    'Hail': '/images/weather/hail.jpg',
    'Sleet': '/images/weather/sleet.jpg',
    'Blowing snow': '/images/weather/blowing-snow.jpg',
    'Blizzard': '/images/weather/blizzard.jpg',
    'Thunderstorm': '/images/weather/thunderstorm.jpg',
    'Tornado': '/images/weather/tornado.jpg'
};








checkForSetup();
showTerrain();
showWeather();

// On window load, start all the game functions 
window.addEventListener('load', setup);


function setup() {
    
    // Setup the regular trail screen
    displayInfo();
    
    if (sessionStorage.isStarted == 'false')
    showStartButton();
    
    
    // Add event listener for start game button
    var startGame = document.getElementById('starting');
    startGame.addEventListener('click', () => {
        // If clicked, get off screen and prompt the first message
        startGame.remove();
        game();
    })
    
}

function game() {
    sessionStorage.isStarted = true;
    
    moveWagon(60);
    
    var box = document.createElement('p');
    box.textContent = "WELCOME TO THE OREGON TRAIL!!!";
    
    box.id = 'event-box';
    
    document.body.appendChild(box);
    
    
    
}

function checkForSetup() {
    if (sessionStorage.isSetup == 'false') {
        window.location = '/setup';
    }
}

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

        // Place wagon based on miles
        placeWagon(data.miles);
        
    })
}


// Puts wagon on page positions it on line
function placeWagon(pos) {
    document.body.appendChild(wagon);
    
    //e
    
    // Get position details of line represent the trail
    var linePosition = document.getElementById('travel-line').getBoundingClientRect();

    // Set Wagon picture on top of line
    wagon.style.top = `${linePosition.top - 20}px`;
    wagon.style.left = `${pos}px`
    
}

// Moves wagon to the right (num) pixels
function moveWagon(num) {
    // ASYNC CALL to move the wagon
    fetch('/api/miles', {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: `{"miles": ${wagon.getBoundingClientRect().left + num}}`
    }).then((res) => {
        return res.text();
    }).then((data) => {
        wagon.style.left = `${data}px`;
    })

}

function showTerrain() {
    // fetch for weather

    fetch('/api/terrain').then((res) => {
        return res.text();
    }).then((data) => {
        var holder = document.getElementById('action')
        holder.src = imageTerrainDict[data]
    })
}

function showWeather() {

    fetch('/api/weather').then((res) => {
        return res.text();
    }).then((data) => {
        // Set background picture to be weather picture
        document.body.style.backgroundImage = `url(${imageWeatherDict[data]})`;
    })
}

function showStartButton() {
    // if game has started return;
    if (sessionStorage.isStarted == 'true') return;

    // Create and display startButton(Using p tag)
    var start = document.createElement('p')

    start.textContent = "Start Game";
    start.id = 'starting'


    // Append to mid page div
    document.getElementById('mid-page').appendChild(start);
}





