var soundState = true;

$(document).ready(function() {
    listenToClickRedirect($("#return-text"), 'mainmenu');
    listenToPressRedirect($("body"), 32, 'mainmenu');
    
})
function listenToClickRedirect(elem, location) {
    elem.click(function() {
        window.location = location;
    });
}


function listenToPressRedirect(elem, keycode, place) {
    elem.on("keypress", function() {
        if (event.which === keycode) {
            event.preventDefault();
            window.location = place;
        }
    });
}


function listentoPressAction(elem, keycode, func) {
    elem.on("keypress", function() {
        if (event.which === keycode) {
            event.preventDefault();
            func();
        }
    });
}