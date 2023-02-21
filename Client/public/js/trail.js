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
box.textContent = 'OREGON TRAIL!';

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

        // add event listener for the p key to change pace
        document.body.addEventListener('keyup', (event) => {
            // Fetch for current pace
            fetch('/api/pace').then((res) => {
                return res.json();
            }).then((info) => {

                // Check if p key was pressed
                if (event.key == 'p') {
                    // if we are on the last pace, reset to the first one
                    var newID = info.id + 1;
                    if (info.id == 3)
                        newID = 0;

                    // change pace with async call and show info again
                    fetch(`/api/pace/${newID}`, {
                        method: 'PATCH'
                    }).then((res) => {
                        return res.json();
                    }).then((data) => {
                        document.getElementById('pace-text').textContent = `Current Pace: ${data.name} \n (Press 'P' to change pace)`;
                    });
                }

            });
        });
    } else if (sessionStorage.gamePhase == 3) {
        console.log("Clearing");
        var elementsToClear = document.body.querySelectorAll(':not(div#event-box):not(background)');

        // loop through the selected elements and remove them from the page
        for (let i = 0; i < elementsToClear.length; i++) {
            const element = elementsToClear[i];
            element.parentNode.removeChild(element);
        }

        // make a masking event listener
        document.body.addEventListener('keydown', masking);
        endGame();
    }

}

function masking(event) {
    event.stopPropagation();
}

// Walking the trail, moving miles and generating events
function walkTrail() {
    // Every 2 secs, move on to the next day
    var move = setInterval(() => {
        nextDay(move);
    }, 1000);


}

// Shows initial start message
function startMessage() {

    // Create div to hold the start message contents
    box.textContent = "Oregon Trail";


    // Creating beginning message p tags and placing them in dvi
    var text = document.createElement('p');
    text.textContent = "You and your group decide to begin your trip. Everyone is healthy and ready to embark on the trail."
        + "\n Press 'G' to continue.";


    box.appendChild(text);
    box.hidden = false;

    // Add event listener for the 'g' key to advance the game
    document.body.addEventListener('keydown', function start(event) {

        if (event.key === 'g') {
            // Change game phase and remove message from screen
            sessionStorage.gamePhase = 2;

            text.remove();
            box.hidden = true;

            document.body.removeEventListener('keydown', start);
            game();
        }
    })

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
    // check health
    fetch('/api/health').then((res) => {
        return res.text();
    }).then((data) => {
        if (parseInt(data) <= 0) {
            console.log("WOOOOO");
            sessionStorage.gamePhase = 3;
            clearInterval(moving);
            game();
            return;
        }
    })

    if (sessionStorage.gamePhase == 3) clearInterval(moving);

    // check miles before adding a day
    fetch('/api/miles').then((res) => {
        return res.text();
    }).then((text) => {
        if (parseInt(text) >= 500) {
            // if you are the end, trigger the end game
            clearInterval(moving);
            sessionStorage.gamePhase = 3;
            game();
            return;
        }
    });
    if (sessionStorage.gamePhase == 3) clearInterval(moving);

    // check amount of players
    fetch('/api/setup/player').then((res) => {
        return res.json();
    }).then((data) => {
        var playerArray = data[0];

        if (playerArray.length <= 0) {
            clearInterval(moving);
            sessionStorage.gamePhase = 3;
            game();
            return;
        }
    })
    if (sessionStorage.gamePhase == 3) clearInterval(moving);

    // increment day and update days info on window
    fetch('/api/day').then((res) => {
        displayInfo();
        return res.text()
    }).then((data) => {
        if (data == "max") {
            // game over
            clearInterval(moving);
            sessionStorage.gamePhase = 3;
            game();
            return;
        }
        else {
            // if game is not over, move miles based on terrain and pace
            fetch('api/gameData').then((res) => {
                return res.json();
            }).then((data) => {
                var weather = data['currentWeather'];
                var pace = data['currentPace'];
                var terrain = data['currentTerrain'];

                var paceChange = pace.mileChange + terrain.paceChange;
                var healthChange = pace.healthChange + terrain.healthChange;

                if (weather.severe) {// it effects miles and health
                    paceChange *= (1 - weather.mileChange);
                    healthChange *= (1 - weather.healthChange);
                }

                // check if values are appropiate
                if (paceChange < 0)
                    paceChange = 1;
                else if (healthChange + data.groupHealth.health > 100)
                    healthChange = 0;


                return [healthChange, paceChange];

            }).then((values) => {
                console.log(values);
                // change health based on terrain and weather
                moveWagon(values[1]);
                changeHealth(values[0]);


                // generates an event 50% of the time
                if (Math.random() < 0.5) {
                    // stop changing days
                    clearInterval(moving);

                    showEvent();


                }
            })
        }
    })
}

function changeHealth(num) {
    fetch('/api/health', {
        method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: `{
                "health": ${num}
            }`
    });
}

function endGame() {
    // Get miles and days
    fetch('/api/gameData').then((res) => {
        return res.json();
    }).then((data) => {
        var reasonElement = document.createElement('h3');
        var multiplier = 1;
        var players = data['players'];
        var days = data['totalDays'];
        var miles = data['miles'];



        if (players.length <= 0) {// if all players died
            box.innerHTML = '<h2>Game Over<h2>';
            reasonElement.textContent = "Your whole group died!";
        } else if (days >= 45) {// ran out of days
            box.innerHTML = '<h2>Game Over<h2>';
            reasonElement.textContent = "You didn't make it in time!"
        } else if (miles >= 500 && days <= 45) { // completed the game
            box.innerHTML = "<h2>Game Over<h2>"
            reasonElement.textContent = "You succcesfully finished the trail!";
            multiplier = 100;
        }

        box.appendChild(reasonElement);
        box.hidden = false;

        return [players.length, miles, days, multiplier];
    }).then((values) => {
        // calculate points and send it to db
        var points = (Math.floor(values[1]/values[2]) + values[0]) * values[3];

        // display points
        var pointsP = document.createElement('h2');
        pointsP.textContent = `Points: ${points}`;

        box.appendChild(pointsP);

        // get time in proper format
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // months are zero-indexed
        const day = currentDate.getDate();
        const hour = currentDate.getHours();
        const minute = currentDate.getMinutes();
        const second = currentDate.getSeconds();

        // format the date to match the DATETIME format
        const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

        fetch('/api/topTen', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: `{
                "name": "${sessionStorage.getItem('Player0')}",
                "date": "${formattedDate}",
                "score": ${points}
            }`
        }).then(() => {
            // button to restart the game
            var restartButton = document.createElement('button');
            restartButton.textContent = "Restart Game";

            box.appendChild(restartButton);

            restartButton.onclick = () => {
                document.body.removeEventListener('keydown', masking);
                restartGame();
            }
        })
    })
}

function showEvent() {
    var eventText = document.createElement('p');

    // 50/50 on it being a change in terrain/weather or story event
    var randNum = Math.random();
    var terrain = "";
    var effects = [];


    if (randNum > 0.5) { // weather or terrain change

        // fetch to get a change
        fetch('/api/event/change').then((res) => {
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
                        eventText.textContent = `The terrain and weather have both changed to ${terrain} and ${weather}, respectively. 
                        \n Be sure to adjust your travel plans accordingly to ensure a safe and successful journey on the trail.`

                        showWeather();
                        showTerrain();
                    })
                })


            }

            // show message
            box.appendChild(eventText);

            // listen for dismiss key
            dismissListener();
        })
    } else {
        // fetch to get a story event
        fetch('api/event').then((res) => {
            return res.json();
        }).then((event) => {

            // check length of result
            var choices = event[1];
            var prompt = event[0];
            var options = [];

            if (choices.length != 0) {
                if (choices.length == 2) { // No choice event
                    // Only add effects
                    effects = choices[1]

                    // listen for dismiss key
                    dismissListener();
                } else if (choices.length == 4) { // Choice event
                    // add effects
                    effects.push(choices[1]);
                    effects.push(choices[3]);

                    // add options text
                    options.push(choices[0]);
                    options.push(choices[2]);

                    // listen options presses
                    listenForChoice(effects);

                }
            }


            // put prompt in p tag and add to box div
            var promptElement = document.createElement('p')
            promptElement.textContent = prompt;
            box.appendChild(promptElement);


            console.log(options);
            // add choices on screen if theres a choice
            if (options.length != 0) {
                var i = 1
                options.forEach((option) => {
                    if (i > 2) i = 0; // reset to 0 if there are more options (should never happen)
                    var optionElement = document.createElement('p');
                    optionElement.textContent = `${i}: ${option}`;
                    box.appendChild(optionElement);
                    i++;
                })
            } else { // no choice add what happens to screen
                fetch('/api/event/change', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: `{"change": "${effects}"}`
                }).then((res) => {
                    return res.text();
                }).then((data) => {
                    var newP = document.createElement('p');
                    newP.textContent = data;

                    box.appendChild(newP);
                })

            }

            // ADD EVENT LISTENER to not allow space to be pressed
            document.body.addEventListener('keydown', pause);
        })
    }

    box.hidden = false;
}

function pause(event) {
    if (event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
    }
}

function listenForChoice(effectList) {
    console.log("Choices!: " + effectList);
    // add event listener for you and two
    document.addEventListener('keydown', function listener(event) {
        console.log(event.key);
        if (event.key == '1') {
            // Key has been pressed, so remove the event listener
            fetch('/api/event/change', {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: `{"change": "${effectList[0]}"}`
            }).then((res) => {
                return res.text()
            }).then((data) => {
                box.innerHTML = `<p>${data}</p>`
            })
            setTimeout(() => {
                box.hidden = true;
                box.innerHTML = "";
                walkTrail();

            }, 1000);

            document.removeEventListener('keydown', listener);
            document.body.removeEventListener('keydown', pause);

        } else if (event.key == '2') {
            fetch('/api/event/change', {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: `{"change": "${effectList[1]}"}`
            }).then((res) => {
                return res.text()
            }).then((data) => {
                box.innerHTML = `<p>${data}</p>`
            })
            setTimeout(() => {
                box.hidden = true;
                box.innerHTML = "";
                walkTrail();

            }, 1000);

            document.removeEventListener('keydown', listener);
            document.body.removeEventListener('keydown', pause);
        }

    });
}

function dismissListener() {
    // Add to text to tell viewer to dismiss with 'n'
    var dismissText = document.createElement('p');
    dismissText.textContent = 'Press "N" to dismiss';

    box.appendChild(dismissText);

    document.addEventListener('keydown', function listener(event) {
        if (event.key == 'n') {
            // Key has been pressed, so remove the event listener
            box.innerHTML = "";
            box.hidden = true;
            walkTrail();
            document.removeEventListener('keydown', listener);
        }
    });
}


function restartGame() {
    // clear sessionStorage and set isStarted to false
    sessionStorage.clear();

    // refresh server data
    fetch('/api/reset').then((res) => {
        window.location = "/";
    })


}





