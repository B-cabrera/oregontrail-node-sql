const express = require('express' );
const app = express();
const port = 1337;


app.use(express.static('Client/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: './Client/views'});
});

/* 
NOTE !!! FROM HERE TO END HAS BEEN CODED ON A MACHINE
WITHOUT NODE.JS. CODE WAS ONLY WRITTEN, NOT TESTED.
PLEASE TEST AND REMOVE THIS MESSAGE WHEN TESTED
*/
// START
app.get('/mainmenu', (req, res) => {
    res.sendFile('mainmenu.html', {root: '.Client/views'});
});

app.get('/topten', (req, res) => {
    res.sendFile('topten.html', {root: '.Client/views'});
});

app.get('/setup', (req, res) => {
    res.sendFile('setup.html', {root: '.Client/views'});
});

app.get('/trail', (req, res) => {
    res.sendFile('trail.html', {root: '.Client/views'});
});

//END

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}); 