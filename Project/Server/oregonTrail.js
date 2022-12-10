const express = require('express' );
const bodyParser = require('body-parser');
const gameController = require('./controllers/gameController');
const setupController = require('./controllers/setupController');
const topTenController = require('./controllers/topTenController');
const eventController = require('./controllers/eventController');
const app = express();
const port = 1337;

app.use(express.static('./Client/public'));

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

// GETS
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

// ROUTES

// GAME CONTROLLER
app.route('/api/pace/:id')
.patch(gameController.changePace);

app.route('/api/pace')
.get(gameController.getPace)
.delete(gameController.resetPace);

app.route('/api/weather')
.get(gameController.getWeather)
.delete(gameController.resetWeather);

app.route('/api/weather/:id')
.patch(gameController.changeWeather);

app.route('/api/gameData')
.get(gameController.getGameData);

app.route('/api/health')
.get(gameController.getHealth)
.post(gameController.addHealth);

app.route('/api/terrain')
.get(gameController.getTerrain);

app.route('/api/terrain/:id')
.patch(gameController.changeTerrain);

app.route('/api/miles')
.get(gameController.getMiles)
.post(gameController.setMiles);

app.route('/api/day')
.get(gameController.addDay)
.post(gameController.setDay);

app.route('/api/reset')
.get(gameController.resetGame)
.get(setupController.resetGame);

// TOP TEN CONTROLLER
app.route('/api/topTen')
.get(topTenController.getTopTen)
.post(topTenController.addNewScore);


// SETUP CONTROLLER
app.route('/api/setup/player/:id')
.get(setupController.getPlayerInfo);

app.route('/api/setup/player')
.get(setupController.getPlayerNames);

app.route('/api/setup/profession')
.post(setupController.setProfession);


app.route('/api/setup/screen/:id')
.get(setupController.getSetupScreen);

app.route('/api/setup/player/money')
.post(setupController.setPlayerMoney);

app.route('/api/setup/player/name')
.post(setupController.setName);

app.route ('/api/setup/month')
.post(setupController.setMonth);

app.route('/api/player/money')
.get(setupController.getMoney);

// EVENT CONTROLLER
app.route('/api/event/change')
.get(eventController.getChange)
.post(eventController.makeChange);

app.route('/api/event')
.get(eventController.getEvent);

app.route('/api/event/bible')
.post(eventController.resetBibleEvent)
