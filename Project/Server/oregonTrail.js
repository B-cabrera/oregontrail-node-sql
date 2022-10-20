const express = require('express' );
const app = express();
const port = 1337;


app.use(express.static('./Client/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: './Client/views'});
});


app.get('/mainmenu', (req, res) => {
    res.sendFile('mainmenu.html', {root: './Client/views'});
});

app.get('/topten', (req, res) => {
    res.sendFile('topten.html', {root: './Client/views'});
});

app.get('/setup', (req, res) => {
    res.sendFile('setup.html', {root: './Client/views'});
});

app.get('/trail', (req, res) => {
    res.sendFile('trail.html', {root: './Client/views'});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}); 