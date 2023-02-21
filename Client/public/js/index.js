// Listening for click of returning to menu text
window.addEventListener('load',listenToClickRedirect(document.querySelector("#return-text"), "/mainmenu"));

// Fading text when window loads
window.addEventListener('load', fading(document.querySelector(".fade-in-text")));

// On the first load, set variable to know if game was setup yet
window.addEventListener('load', setSetup);

// function for fading text
function fading(obj) {
    setInterval(() => {
        obj.classList.toggle("fade");
    }, 700);

}

// Sets variable at the beginning
function setSetup() {
    if (!sessionStorage.isSetup) {
        sessionStorage.setItem('isSetup', false)
    } else
        return;
}




