// Initializing state of sound to always be false
var soundState = false;

// Listening for Clicks and Presses after document is fully loaded
window.onload = (event)  => {
    var body = document.body;
    var here = window.location.href.split("/").pop();
    var music = document.getElementById("music");


    if (here != "mainmenu")
        listenToPressRedirect(body, " ", '/mainmenu');
    

}



// listen to clicks on a specific object, then changing page to location
function listenToClickRedirect(elem, location) {
    if(elem) {
        elem.onclick = (event) => {
            event.preventDefault();
            window.location = location;
        }
    }
}

// Listen to key press, then changing page to location
function listenToPressRedirect(elem, key, place) {

    elem.addEventListener('keydown', function() {
        event.preventDefault();
        
        if (event.key === key) {
            window.location = place;
        }
    });
}

// Listen to key press, then executing function
function listentoPressAction(elem, key, func) {
    elem.addEventListener('keydown', function() {
        if (event.key === key) {
            event.preventDefault();
            func();
        }
    });
}

