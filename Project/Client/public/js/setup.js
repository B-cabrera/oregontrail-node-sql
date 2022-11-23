var menu = document.getElementById('menu');
var isPageDone = false;
var pNum = 0;

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
        isPageDone = true;
    } else if (event.key === "2") {
        sessionStorage.setItem('profession', 'Carpenter');
        isPageDone = true;
    } else if (event.key === "3") {
        sessionStorage.setItem('profession', 'Farmer');
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
        begin();
    }
    // if (event.key != "/" ) {
    //     sessionStorage.setupPhase = 1;
    //     begin();
    // }
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
                begin();
            }
        }





    }
}

function begin() {
    fetch(`/api/setup/screen/${sessionStorage.setupPhase}`).then(res => {
        return res.text();
    }).then(
        data => {
            menu.innerHTML = data;
        }
    );


    if (sessionStorage.setupPhase == 0) {
        document.body.addEventListener('keydown', chooseChoice, true);
    } else if (sessionStorage.setupPhase == 1) {
        document.body.removeEventListener('keydown', chooseChoice, true);
        document.body.addEventListener('keydown', getName, true);




    }

}


