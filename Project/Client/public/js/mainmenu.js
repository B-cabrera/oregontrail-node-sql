var body = document.body;

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

    soundState = !soundState

    if (soundState)
        soundStatus.textContent = "On";
    else
        soundStatus.textContent = "Off";
}