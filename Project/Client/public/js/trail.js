

function checkForSetup() {
    if (sessionStorage.isSetup == 'false') {
        window.location = '/setup';
    }  
}

checkForSetup();