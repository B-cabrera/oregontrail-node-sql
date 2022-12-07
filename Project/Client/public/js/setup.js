var menu = document.getElementById('menu');
var isPageDone = false;
var pNum = 0;
var months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
]


window.addEventListener('load', () => {
    // check if sessionStorage already has values
    if (sessionStorage.setupPhase) {
        begin();
        return;
    }

    sessionStorage.setItem('setupPhase', 0);

    begin();
})

document.body.addEventListener('keyup', () => {
    event.preventDefault();

    if (event.key === "/")
        window.location = "/mainmenu";
})


function chooseChoice(event) {
    event.preventDefault();

    if (event.key === "1") {
        sessionStorage.setItem('profession', 'Banker');
        sessionStorage.setItem('pMoney', 2000);
        isPageDone = true;
    } else if (event.key === "2") {
        sessionStorage.setItem('profession', 'Carpenter');
        sessionStorage.setItem('pMoney', 1800)
        isPageDone = true;
    } else if (event.key === "3") {
        sessionStorage.setItem('profession', 'Farmer');
        sessionStorage.setItem('pMoney', 1500)
        isPageDone = true;
    } else if (event.key === "4") {
        // SETUP LATER
        fetch('/api/setup/screen/4').then(res => {
            return res.text();
        }).then(data => {
            menu.innerHTML = data;
        });

    } else {
        return;
    }

    if (isPageDone) {
        sessionStorage.setupPhase = 1;

        // ASYNC call to set profession of player
        fetch('/api/setup/profession',
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: '{"profession": "' + sessionStorage.getItem('profession') + '"}'
            }).then(res => {
                console.log("Profession set!");
            });


        // ASYNC call to set player money
        fetch('/api/setup/player/money',
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: '{"money": "' + sessionStorage.getItem('pMoney') + '"}'
            }).then(res => {
                console.log("Player Money Set !");
            });

        begin();
    }

}

function checkForSpaces(text) {
    console.log("Is it all spaces ?" + /^\s*$/.test(text));
    return /^\s*$/.test(text);
}

function getName(event) {
    if (event.key === "Enter") {

        // Check for valid input
        if (!checkForSpaces(document.getElementById("prompt").value)) {
            sessionStorage.setItem(`Player${pNum}`, document.getElementById("prompt").value.trim());
            document.getElementById("prompt").value = "";
            document.getElementById("inputlabel").textContent = "Name for next group member?:"

            pNum++;

            if (pNum > 4) {
                sessionStorage.setupPhase = 2;

                // Loop for async calls to set player names, using template literal
                for (let playerID = 0; playerID < 5; playerID++) {
                    fetch('/api/setup/player/name',
                        {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            },
                            body: `{"playerNum": ${playerID}, "name": "${sessionStorage.getItem(`Player${playerID}`)}"}`
                        }).then(res => {
                            console.log(`Player${playerID} Name Set!`);
                        });
                }

                begin();
            }
        }


    }
}

function getStartMonth(event) {
    if (event.key === "Enter") {
        var input = document.getElementById("monthInput").value;

        // Check for all spaces or no text
        if (!checkForSpaces(input)) {
            document.getElementById("monthInput").value = "";
            // Trim off beginning and end whitespace
            // Make all lowercase and check with month array
            if (months.indexOf(input.trim().toLowerCase()) >= 0) {
                sessionStorage.setItem('startMonth', input.trim().toLowerCase());

                sessionStorage.setupPhase = 3;

                // ASYNC call to set startMonth
                fetch('/api/setup/month',
                    {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                        body: `{"month": "${sessionStorage.getItem('startMonth')}"}`
                    }).then(res => {
                        console.log(`Starting Month Name Set!`);
                    });

                begin();
            }
        }

        document.getElementById("monthInputLabel").textContent = "Invalid Month!";


    }
}

function begin() {

    var fetched = fetch(`/api/setup/screen/${sessionStorage.setupPhase}`).then(res => {
        return res.text();
    }).then(
        data => {
            console.log("Got data up");
            menu.innerHTML = data;
        }
    );

    if (sessionStorage.setupPhase == 0) {

        document.body.addEventListener('keydown', chooseChoice, true);
        
    } else if (sessionStorage.setupPhase == 1) {

        document.body.removeEventListener('keydown', chooseChoice, true);
        document.body.addEventListener('keydown', getName, true);

    } else if (sessionStorage.setupPhase == 2) {

        document.body.removeEventListener('keydown', getName, true);
        document.body.addEventListener('keydown', getStartMonth, true);

    } else if (sessionStorage.setupPhase == 3) {

        document.body.removeEventListener('keydown', getStartMonth, true);

        // Set isSetup variable in session Storage true to "unlock" trail page
        sessionStorage.isSetup = true;
        // Show summary after the initial page is fetched
        fetched.then(() => {
            
            // Get the user name and profession
            fetch('/api/setup/player/0').then((res) => {
                return res.json()
            }).then((data) => {
                var name = data[0]
                var prof = data[1]
                
                // Place data on screen
                document.getElementById('userName').textContent = `Your name: ${name}`;
                document.getElementById('userProf').textContent = `Your Profession: ${prof}`;
            }).then(() => {
                // Get player money 
                fetch('api/player/money').then((res) => {
                    return res.text();
                }).then((data) => { 
                    var money = data;
                    
                    // Place data on screen
                    document.getElementById('userMoney').textContent = `Your money: $${money}`;
                    
                });
            }).then(() => {
                // Get player names
                fetch('/api/setup/player').then((res) => {
                    return res.json()
                }).then((data) => {
                    var len = Object.keys(data).length;
                    var restNames = [];
                    
                    for (var i = 1; i < len; i++)
                        restNames.push(data[i]);

                    document.getElementById('names').textContent = `Group: ${restNames}`;
                })
            }).then(() => {
                // Get month
                fetch('/api/gameData/').then((res) => {
                    return res.json();
                }).then((data) => {
                    var month = data.startMonth.substring(0,1).toUpperCase() + data.startMonth.substring(1);
                    

                    document.getElementById('month').textContent = `Starting Month: ${month}`;
                })
            })

            // Create the isStarted value for the game
            sessionStorage.setItem('isStarted', false);


        })

    };

}


