class TopScore {
    constructor(who, day, points) {
        this.name = who;
        this.date = day;
        this.score = points;
    }
}


// SAMPLE VALUES INSIDE ARRAY
const scores = [];
for (var i = 0; i < 10; i++) {
    scores[i] = new TopScore(i+1, i+2, (i+1) * 100);
}

console.log(scores);

$(document).ready(function() {
    scores.forEach((item) => {
        var listItem = document.createElement("li");
        listItem.innerText = `${item.name}  ${item.date}  ${item.score}`;
        $("#scores").append(listItem);
    });




});





