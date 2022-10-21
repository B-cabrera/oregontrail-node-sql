class TopScore {
    constructor(who, day, points) {
        this.name = who;
        this.date = day;
        this.score = points;
    }
}


// SAMPLE VALUES INSIDE ARRAY
var scores = [];
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const dates = ["11-1", "12-4", "1-10", "5-4", "7-10", "9-18", "10-10", "4-3", "9-18", "3-4"];

for (var i = 0; i < 10; i++) {
    const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
    const randDate = dates[Math.floor(Math.random() * dates.length)];
    scores[i] = new TopScore(randomCharacter, randDate, (i+1) * 100);
}

console.log(scores);

$(document).ready(function() {

    scores = sortScores(scores);




    scores.forEach((item) => {
        var listItem = document.createElement("li");
        listItem.innerText = `${item.name}  ${item.date}  ${item.score}`;
        $("#scores").append(listItem);
    });




});


function sortScores(pointsList) {
    var sortedList = [];

    while (pointsList.length > 0) {
        var maxInd = maxIndex(pointsList);
        var currentMax = pointsList[maxInd];

        sortedList.push(currentMax);
        pointsList.splice(maxInd, 1);

    }

    return sortedList;
}


function maxIndex(scoresList) {
    var maximum = 0;
    var index = 0;
    for(var i = 0; i < scoresList.length; i++) {
        if (scoresList[i].score > maximum) {
            maximum = scoresList[0].score;
            index = i;
        }
    }

    return index;
}





