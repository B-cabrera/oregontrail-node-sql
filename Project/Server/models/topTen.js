// HOLDS ONE TOP SCORE, NAME, AND POINTS
class TopScore {
    constructor(who, day, points) {
        this.name = who;
        this.date = day;
        this.score = points;
    }
}

// EXPORTING A WAY TO MAKE NEW TOP POINT OBJ
exports.topScore = function(who, day, points) {
    return new TopScore(who, day, points);
}

// Holds an array of TopScore obj's
class TopTen {

    // Value passed should be array of topscore objects
    constructor(scores) {

        // Example list
        this.topPoints = [new TopScore('Brenden', new Date().toDateString(), 1000)];
    }



}


// EXPORTING TOP TEN OBJ
exports.topTen = new TopTen();