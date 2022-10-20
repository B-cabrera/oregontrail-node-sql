var soundState = true;


$(document).ready(function() {
    /*
    keycodes {
        1: 49
        2: 50
        3: 51
        4: 52
    }
    */

    // Listening for key press of the "1" key and redirecting
    listenToPressRedirect($("body"), 49, 'trail');

    // Listening for key press of the "2" key and redirecting
    listenToPressRedirect($("body"), 50, 'setup');

    // Listening for key press of the "3" key and redirecting
    listenToPressRedirect($("body"), 51, 'topten');

    // Listening for key press of the "4" key and toggling Music
    listentoPressAction($("body"), 52, function() {
        toggleSound();
    });

});


function toggleSound(state) {

    soundState = !soundState

    if (soundState)
        $("#sound-status").text("On")
    else
        $("#sound-status").text("Off");
}