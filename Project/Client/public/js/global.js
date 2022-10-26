// Initializing state of sound to always be true
var soundState = true;

// Listening for Clicks and Presses after document is fully loaded
$(document).ready(function() {
    listenToClickRedirect($("#return-text"), '/mainmenu');
    listenToPressRedirect($("body"), 32, '/mainmenu');
    
})

// listen to clicks on a specific object, then changing page to location
function listenToClickRedirect(elem, location) {
    elem.click(function() {
        window.location = location;
    });
}

// Listen to key press, then changing page to location
function listenToPressRedirect(elem, keycode, place) {
    elem.on("keypress", function() {
        if (event.which === keycode) {
            event.preventDefault();
            window.location = place;
        }
    });
}

// Listen to key press, then executing function
function listentoPressAction(elem, keycode, func) {
    elem.on("keypress", function() {
        if (event.which === keycode) {
            event.preventDefault();
            func();
        }
    });
}