var body = document.body;


window.addEventListener('load', displayStatus);


// Listening for key press of the "1" key and redirecting
listenToPressRedirect(body, "1", '/trail')

// Listening for key press of the "2" key and redirecting
listenToPressRedirect(body, "2", '/setup');

// Listening for key press of the "3" key and redirecting
listenToPressRedirect(body, "3", '/topten');

// Listening for key press of the "4" key and toggling Music
listentoPressAction(body, "4", function () {
    toggleSound();
});

// Toggles sounds and updates sound status text
function toggleSound(state) {
    var soundStatus = document.getElementById("sound-status");
    var music = document.getElementById("music");

    soundState = !soundState

    if (soundState) {
        soundStatus.textContent = "On";
        music.play()
    }
    else {
        soundStatus.textContent = "Off";
        music.pause();
    }
}

// Displays sound status text
function displayStatus() {
    console.log("Displaying");
    var soundText = document.getElementById("sound-status");

    if (soundState)
        soundText.textContent = "On";
    else
        soundText.textContent = "Off";
}