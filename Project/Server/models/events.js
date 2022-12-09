const weather = require('./weather');
const terrain = require('./terrain');
const gameData = require('./gameData');

class Events {



    constructor() {
        this.bibleEvent = false;
        this.eventDict = {
            "bible": [1, "As the person traveled along the Oregon Trail, \
they came across a small cabin in the woods. They decided to take a break and explore the cabin, \
and as they searched through the debris and debris, they found a tattered old bible. "],

            "birthday": [101, "It is one of your group member's birthday! Get $500."],

            "broken-leg": [102, "As the group trudged through the muddy Oregon Trail, \
one member suddenly cried out in pain. They had slipped and fallen,\
their leg twisted at an awkward angle - it was clearly broken."],

            "poison-ivy": [103, "You walk past a bush and brush up against it.\
Within minutes, your skin was red and inflamed, and you were writhing in agony."],

            "gold-pot": [104, "As the travelers rounded a bend in the trail, they stumbled upon \
a clearing where a small pot of gold glinted in the sunlight.Excitement and disbelief filled \
them as they realized they had struck it rich on the Oregon Trail"],

            "shortcut-good": [2, "As the group continued on the Oregon Trail, you came across a narrow path \
that seemed to cut directly through the terrian."],

            "shortcut-bad": [3, "As the group continued on the Oregon Trail, you came across a narrow path \
that seemed to cut directly through the terrian."],

            "water-spout-bad": [4, "After days of traversing the arid landscape of the Oregon Trail,\
the travelers were overjoyed to come across a crystal clear pool of water. "],

            "water-spout-good": [5, "After days of traversing the arid landscape of the Oregon Trail, \
the travelers were overjoyed to come across a crystal clear pool of water. "],

            "berries-bad": [6, "As the travelers made their way along the Oregon Trail, they came across a wild berry patch."],

            "person-help": [7, "As the group traveled along the Oregon Trail, they heard faint cries for help coming from across the terrain. \
They followed the sound and discovered a stranded traveler, injured and unable to continue on their own."],

            "robber-good": [8, "As the travelers made their way along the Oregon Trail, they were suddenly confronted by a \
group of robbers. The thieves demanded that the travelers hand over their possessions."],

            "robber-bad": [9, "As the travelers made their way along the Oregon Trail, they were suddenly confronted by a \
group of robbers. The thieves demanded that the travelers hand over their possessions."],

            "cold-clothes": [10, "As the travelers continued on the Oregon Trail, they realized that their clothes were starting \
to fall apart. The constant wear and tear had left them with holes and tears, and they were in desperate need of new clothes.\
Fortunately, they came across a trading post where they were able to purchase new outfits."],

            "god": [105, "As the travelers journeyed along the Oregon Trail, they came across a towering figure that radiated an otherworldly light. \
The figure introduced itself as God, and the travelers were awestruck by its presence. They listened in wonder as God shared its wisdom and \
insights with them. God sends you to the end of the trail!"],

            "devil": [106, "As the travelers journeyed along the Oregon Trail, they came across a shadow figure that radiated an otherworldly light. \
The figure introduced itself as Satan, and the travelers were frozen in shock by its presence. Satan curses the group. Satan sends you to the \
beginning of the trail!"],

            "flood-good": [11, "As the group made their way along the Oregon Trail, they were caught in a sudden downpour. The rain quickly turned into \
a raging flood, and the travelers struggled to keep their wagons afloat as the water rose around them."],

            "flood-bad": [12, "As the group made their way along the Oregon Trail, they were caught in a sudden downpour. The rain quickly turned into \
a raging flood, and the travelers struggled to keep their wagons afloat as the water rose around them."],

            "quicksand-good": [13, "As the travelers made their way along the Oregon Trail, they suddenly found themselves infront of a patch of quicksand."],

            "quicksand-bad": [14, "As the travelers made their way along the Oregon Trail, they suddenly found themselves infront of a patch of quicksand."],

            "horses-good": [15, "As the group traveled along the Oregon Trail, they stumbled upon a group of wild horses. The majestic animals were a welcome sight."],

            "horses-bad": [16, "As the group traveled along the Oregon Trail, they stumbled upon a group of wild horses. The majestic animals were a welcome sight."]
        }

        this.choicesDict = {

            // OPTIONS WITH A CHOICE
            1: ["Pick up bible.", 'yes-bible', "Leave the bible.", 'no-bible'],
            2: ["Take the shortcut.", 'gain-miles', "Don't take the shortcut.", 'lose-days'],
            3: ["Take the shortcut.", 'lose-days', "Don't take the shortcut.", 'gain-miles'],
            4: ["Drink from the pool.", 'gain-health', "Don't drink from the pool.", 'lose-health'],
            5: ["Drink from the pool.", 'lose-health', "Don't drink from the pool.", 'gain-miles'],
            6: ["Eat the berries.", 'player-die', "Don't eat the berries.", 'no-effect'],
            7: ["Help the person.", 'gain-miles', "Don't help the person", 'no-effect'],
            8: ["Fight the robbers.", 'gain-money', "Give up your money.", 'lose-money'],
            9: ["Fight the robbers.", 'player-die, "Give up your money.', 'lose-money'],
            10: ["Buy clothes.", 'lose-money', "Don't buy clothes.", 'lose-health'],
            11: ["Swim through the flood.", 'gain-miles', "Stay put and wait it out.", 'no-effect'],
            12: ["Swim through the flood.", 'player-die', "Stay put and wait it out.", 'add-days'],
            13: ["Walk through it.", 'gain-miles', "Take another way.", 'no-effect'],
            14: ["Walk through it.", 'player-die', "Take another way.", 'no-effect'],
            15: ["Try and tame the horses.", 'gain-miles', "Leave the horses alone", 'no-effect'],
            16: ["Try and tame the horses.", 'player-die', "Leave the horses alone.", 'no-effect'],

            // OPTIONS WITH NO CHOICE
            101: ["no-choice", 'gain-money'],
            102: ["no-choice", 'player-die'],
            103: ["no-choice", 'lose-health'],
            104: ["no-choice", 'gain-money'],
            105: ["no-choice", 'finish-miles'],
            106: ["no-choice", 'reset-miles']
        }

        this.effectDict = {
            'yes-bible': 555,
            'no-bible': 666,
            'gain-miles': Math.floor(Math.random() * 100) + 1, // Gain a random amount of miles
            'lose-days': Math.floor(Math.random() * (gameData.gameInfo.totalDays / 2)) + 1,
            'gain-health': 10,
            'lose-health': 10,
            'player-die': 'kill',
            'gain-money': Math.floor(Math.random() * gameData.gameInfo.players[0].money) + 1,
            'lose-money': Math.floor(Math.random() * gameData.gameInfo.players[0].money) + 1,
            'add-days': Math.floor(Math.random() * 8) + 1,
            'no-effect': null,
            'finish-miles': (500 - gameData.gameInfo.miles),
            'reset-miles': 0
        }
    }


    // Get a change, either weather, terrain, or no change
    getChange() {


        var randNum = Math.random();

        if (randNum < 0.4) // Terrain Change (40% prob)
            // Send an array with 1 as the first element, and terrain as second
            // The one will be used to determine what change came back
            return [1, this.getRandTerrain()];
        else if (randNum < 0.8) // Weather Change (40% prob)
            return [2, this.getRandWeather()];
        else // Both change (20% prob)
            return [3, this.getRandWeather(), this.getRandTerrain()];
    }

    getRandWeather() {
        var weatherList = weather.Weather.createWeatherList();
        var randNum = Math.random();
        var weathers = [];
        var prob = 0;


        if (randNum <= 0.01) { // 1 percent prob
            prob = 0.01
        } else if (randNum > 0.01 && randNum <= 0.03) { // Exceptions because probabilites dont add up to 100%
            return this.getRandWeather();
        } else if (randNum > 0.03 && randNum <= 0.05) { // 2 percent prob
            prob = 0.02;
        } else if (randNum > 0.05 && randNum <= 0.1) {// 5 percent prob
            prob = 0.05;
        } else if (randNum > 0.1 && randNum <= 0.2) { // 10 percent prob
            prob = .1;
        } else if (randNum > 0.2 && randNum <= 0.5) { // 30 percent chance
            prob = 0.3;
        } else { // FROM .5 and up, 50% percent chance
            prob = 0.5;
        }

        weatherList.forEach((weather) => {
            if (weather.chance == prob)
                weathers.push(weather);
        })

        return weathers[Math.floor(Math.random() * weathers.length)];

    }

    getRandTerrain() {
        var terrainList = terrain.Terrain.createTerrainList();
        var randNum = Math.floor(Math.random() * 5)


        return terrainList[randNum];
    }

    getEvent() {
        console.log("Has bible event happened: " + this.bibleEvent);
        // get death chance for death event   
        var chance = gameData.gameInfo.groupHealth.getDeathChance();

        var randNum = Math.random();

        // If there is a chance with prob and chance is picked, kill someone random
        if (chance != 0 && randNum < chance) {
            var dead = this.killPlayer();
            if (dead)
                return[`${dead.name} has died.`]
        } else { // no death, return random event.
            var info;
            var choices;

            // if Bible event hasnt happened, return the bible event
            if (!this.bibleEvent) {
                info = this.eventDict['bible'];
                this.bibleEvent = true;
            } else {
                var randNum = Math.random();

                // small chance to meet god or the devil
                if (randNum < 0.001) { // .1% chance to meet god or the devil
                    // choose random between god or devil
                    var newRandNum = Math.random();

                    newRandNum < 0.5 ? info = this.eventDict['god'] : info = this.eventDict['devil'];
                } else {
                    // If normal event, get a random event from the rest
                    var randIndex = Math.floor(Math.random() * Object.keys(this.eventDict).length) + 1;

                    // Avoid the index that the god and devil events are in
                    while (randIndex == 14 || randIndex == 15)
                        randIndex = Math.floor(Math.random() * Object.keys(this.eventDict).length) + 1;


                    info = this.eventDict[Object.keys(this.eventDict)[randIndex]];
                }
            }


            // return the this array [EventPrompt, [EventChoices]]
            console.log("Info: " + info);
            return [info[1], this.choicesDict[info[0]]];
        }
    }


    killPlayer() {
        console.log("Killing");
        if (gameData.gameInfo.players.length >= 0) {
            var allPlayers = gameData.gameInfo.players;
            var randomIndex = Math.floor(Math.random() * allPlayers.length);

            // put player in dead list, then remove em
            gameData.gameInfo.deadList.push(allPlayers[randomIndex]);
            allPlayers.splice(randomIndex, 1);

            // return name of player that died (last player in dead list)
            return gameData.gameInfo.deadList[gameData.gameInfo.deadList.length - 1]

        }
        return null;
    }
}


module.exports = Events;