export class TopScore {
    constructor(who, day, points) {
        this.name = who;
        this.date = day;
        this.score = points;
    }
}


// BEGIN - FILLING TABLES WITH SAMPLE OBJ's
var scores = [];
var names = ["James", "Him", "Blake", "Mariah", "Hailey", "Amarri", "Trey", "Josh", "Brenden", "Mark"]

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

for (var i = 0; i < 10; i++) {
    const randomCharacter = names[Math.floor(Math.random() * names.length)];
    const randDate = randomDate(new Date(2012, 0, 1), new Date());
    scores[i] = new TopScore(randomCharacter, randDate.toDateString(), (i+1) * 100);
}

// END - FILLING TABLES WITH SAMPLE OBJ'S

// Sorting scores, then adding them to window after it fully loads
window.addEventListener('load', addScores(scores));

function addScores(points) {
    scores = sortScores(scores);
    var table = document.querySelector("#scores");
    
    scores.forEach(score => {
        var currentRow = document.createElement("tr");
        var currentName = document.createElement("td");
        var currentScore = document.createElement("td");
        var currentDate = document.createElement("td");

        currentName.textContent = score.name;
        currentScore.textContent = score.score;
        currentDate.textContent = score.date;

        currentRow.appendChild(currentName);
        currentRow.appendChild(currentScore);
        currentRow.appendChild(currentDate);
       


        table.appendChild(currentRow);
    });

}






// Sorts scores array by adding max value in array to new array, returns new array
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

// Finds and returns index of max number in array
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





