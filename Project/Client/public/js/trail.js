var wagon = new Image(80,50)

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




wagon.src = '/images/misc/dark-brown-wagon.png';
wagon.id = 'wagon';




checkForSetup();

// On window load, get game data to fill out fields, place wagon
window.addEventListener('load', displayInfo);
window.addEventListener('load', placeWagon);
window.addEventListener('load', showTerrain);
window.addEventListener('load', showWeather);


// moveWagon(300);

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

    })
}


// Puts wagon on page positions it on line
function placeWagon() {

    // Add to page
    document.body.appendChild(wagon);

    // Get position details of line represent the trail
    var linePosition  = document.getElementById('travel-line').getBoundingClientRect();

    // Set Wagon picture on top of line
    wagon.style.top = `${linePosition.top - 20}px`;
}

// Moves wagon to the right (num) pixels
function moveWagon(num) {
    
    // Get wagon x position or "left"
    var wagonLeft = wagon.getBoundingClientRect().left;

    // Set new left to previous left + num
    wagon.style.left = `${wagonLeft + num}px`
}

function showTerrain() {
    // fetch for weather

    fetch('/api/terrain').then((res) => {
        return res.text();
    }).then((data) =>{
        var holder = document.getElementById('action')
        holder.src = imageTerrainDict[data]
    })
}

function showWeather() {

    fetch('/api/weather').then((res) => {
        return res.text();
    }).then((data) => {
        // Set background picture to be weather picture
        document.body.style.backgroundImage =  `url(${imageWeatherDict[data]})`;
    })
}





