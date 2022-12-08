var wagon = new Image(80, 50);
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

// var box = document.createElement('div')
var box = document.getElementById('event-box')
box.textContent = 'WELCOME TO OREGON TRAIL!';
box.id = 'event-box'
box.hidden = true;

// On window load, start all the game functions 
window.addEventListener('load', game);


function game() {

    // Setup the regular trail screen
    showTerrain();
    showWeather();
    displayInfo();

    if (sessionStorage.gamePhase == 0) {
        showStartButton();
    } else if (sessionStorage.gamePhase == 1) {
        startMessage();
    } else if (sessionStorage.gamePhase == 2) {
        walkTrail();

        // // add event listener for the p key to change pace
        // document.body.addEventListener('keyup', (event) => {
        //     // Fetch for current pace
        //     fetch('/api/pace').then((res) => {
        //         return res.json();
        //     }).then((info) => {

        //         // Check if p key was pressed
        //         if (event.key == 'p') {
        //             // if we are on the last pace, reset to the first one
        //             var newID = info.id + 1;
        //             if (info.id == 3)
        //                 newID = 0;

        //             // change pace with async call and show info again
        //             fetch(`/api/pace/${newID}`, {
        //                 method: 'PATCH'
        //             }).then((res) => {
        //                 return res.json();
        //             }).then((data) => {
        //                 document.getElementById('pace-text').textContent = `Current Pace: ${data.name} \n (Press 'P' to change pace)`;
        //             });
        //         }

        //     });
        // });
    }

}

// Walking the trail, moving miles and generating events
function walkTrail() {
    // Every 2 secs, move on to the next day
    var move = setInterval(() => {
        nextDay(move);
        // moveWagon(50);
        // generateEvent(move);
    }, 1000);


}

// Shows initial start message
function startMessage() {

    // Create div to hold the start message contents
    box.textContent = "WELCOME TO THE OREGON TRAIL!";


    // Creating beginning message p tags and placing them in dvi
    var text = document.createElement('p');
    text.textContent = "You and your group decide to begin your trip. Everyone is healthy and ready to embark on the trail."
        + "\n Press 'G' to continue.";


    box.appendChild(text);
    box.hidden = false;

    // Add event listener for the 'g' key to advance the game
    document.body.addEventListener('keyup', (event) => {

        if (event.key === 'g') {
            // Change game phase and remove message from screen
            sessionStorage.gamePhase = 2;

            text.remove();
            box.hidden = true;

            game();
        }
    }, { once: true })

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
        weatherElement.textContent = `Current Weather: ${data.currentWeather.weather}`;
        paceElement.textContent = `Current Pace: ${data.currentPace.name} \n (Press 'P' to change pace)`;
        terrainElement.textContent = `Current Terrain: ${data.currentTerrain.terrain}`;
        aliveElement.textContent = `# of party members alive: ${data.players.length}`;

        // Place wagon based on miles
        placeWagon(data.miles);



    })
}



// Puts wagon on page positions it on line
function placeWagon(pos) {
    document.body.appendChild(wagon);


    // Get position details of line represent the trail
    var linePosition = document.getElementById('travel-line').getBoundingClientRect();

    // Set Wagon picture on top of line
    wagon.style.top = `${linePosition.top - 20}px`;

    // Compute miles to accurately show on screen
    var computedMove = (pos / 500) * document.body.clientWidth;

    wagon.style.left = `${computedMove}px`

}

// Moves wagon to the right (num) pixels
function moveWagon(num) {
    // ASYNC CALL to get and change miles, and update miles on that
    fetch('/api/miles').then((res) => {
        return res.text();
    }).then((data) => {
        data = parseInt(data);

        // update miles with post
        fetch('/api/miles', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: `{"miles": ${data + num}}`
        }).then(() => {
            displayInfo();
        })
    })
}

function showTerrain() {
    // fetch for weather

    fetch('/api/terrain').then((res) => {
        return res.json();
    }).then((data) => {
        var holder = document.getElementById('action')
        holder.src = imageTerrainDict[data.terrain]
    })
}

function showWeather() {

    fetch('/api/weather').then((res) => {
        return res.json();
    }).then((data) => {
        // Set background picture to be weather picture
        document.body.style.backgroundImage = `url(${imageWeatherDict[data.weather]})`;
    })
}

function showStartButton() {
    // if game has started return;
    if (sessionStorage.gamePhase > 0) return;

    // Create and display startButton(Using p tag)
    var start = document.createElement('p')

    start.textContent = "Start Game";
    start.id = 'starting'


    // Append to mid page div
    document.getElementById('mid-page').appendChild(start);

    // Add event listener for start game button
    start.addEventListener('click', () => {
        // If clicked, get off screen and prompt the first message
        start.remove();


        // When started, change game phase
        sessionStorage.setItem('gamePhase', 1);
        game();
    })
}

function nextDay(moving) {
    // increment day and update days info on window
    fetch('/api/day').then((res) => {
        displayInfo();
        return res.text()
    }).then((data) => {
        if (data == "max")
            clearInterval(moving);
        // game over
        else {
            // if game is not over, move miles based on terrain and pace
            // change health based on terrain and weather
            moveWagon(10);

            // generates an event 50% of the time
            if (Math.random() < 0.5) {
                // stop changing days
                clearInterval(moving);

                showEvent();


            }
        }
    })
}

function showEvent() {
    var eventText = document.createElement('p');

    // 50/50 on it being a change in terrain/weather or story event
    var randNum = Math.random();
    var weather = "";
    var terrain = "";


    if (randNum > 0.5) {
        // fetch to get a change
        fetch('/api/event').then((res) => {
            return res.json();
        }).then((data) => {
            /* Data form
                0: num referring to what change has been made
                (1, terrain Change; 2, weather change; 3, both)
                1: The new terrain or weather or both
            */
            if (data[0] == 1) { // Terrain Change
                // async patch to update terrain
                fetch(`/api/terrain/${data[1].id}`, {
                    method: "PATCH"
                }).then((res) => {
                    return res.json();
                }).then((val) => {
                    // Update value on screen
                    document.getElementById('terrain-text').textContent = `Current Terrian: ${val.terrain}`;
                    eventText.textContent = `The terrain has changed to ${val.terrain}.
                    \n Be sure to adjust your travel speed and watch for any potential hazards on the trail.`;

                    showTerrain();
                })

            } else if (data[0] == 2) { // Weather Change
                fetch(`/api/weather/${data[1].id}`, {
                    method: "PATCH"
                }).then((res) => {
                    return res.json();
                }).then((obj) => {
                    document.getElementById('weather-text').textContent = `Current Weather: ${obj.weather}`;
                    eventText.textContent = `The weather has changed to ${obj.weather}. 
                    \n Be sure to adjust your travel plans accordingly to avoid any challenges on the trail.`

                    showWeather();
                })
            } else { // Terrain and weather change
                var message = "";

                // First, async req to change weather
                fetch(`/api/weather/${data[1].id}`, {
                    method: "PATCH"
                }).then((res) => {
                    return res.json();
                }).then((info) => {
                    // update info on screen
                    document.getElementById('weather-text').textContent = `Current Weather: ${info.weather}`;
                    return info.weather;
                }).then((weather) => {
                    // after weather change, async all to change terrain
                    fetch(`/api/terrain/${data[2].id}`, {
                        method: "PATCH"
                    }).then((res) => {
                        return res.json()
                    }).then((text) => {
                        // update info on screen
                        terrain = text.terrain;
                        document.getElementById('terrain-text').textContent = `Current Terrian: ${terrain}`;
                        return terrain;
                    }).then((terrain) => {
                        // Set event text
                        eventText.textContent =`The terrain and weather have both changed to ${terrain} and ${weather}, respectively. 
                        \n Be sure to adjust your travel plans accordingly to ensure a safe and successful journey on the trail.`
    
                        showWeather();
                        showTerrain();
                    })
                })

            }
        })
    } else {
        // fetch to get a story event
        eventText.textContent = 'YING';
    }





    var box = document.getElementById('event-box');
    box.appendChild(eventText);
    box.hidden = false;

    document.body.addEventListener('keyup', (event) => {
        if (event.key == 'n') {
            eventText.remove();
            box.hidden = true;
            walkTrail();
        }
    }, {once: true})
}





