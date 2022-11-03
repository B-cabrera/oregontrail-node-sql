// Listening for click for click of returning to menu text
window.addEventListener('load',listenToClickRedirect(document.querySelector("#return-text"), "/mainmenu"));

// Fading text when window loads
window.addEventListener('load', fading(document.querySelector(".fade-in-text")));

// function for fading text
function fading(obj) {
    setInterval(() => {
        obj.classList.toggle("fade");
    }, 700);

}




