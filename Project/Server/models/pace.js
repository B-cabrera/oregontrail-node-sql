class Pace {

    constructor(title, distance, healthEffect) {
        this.name = title;
        this.mileChange = distance;
        this.healthChange = healthEffect;
    }




    createPaceList() {
        return [
            new Pace('Steady', 50, -1),
            new Pace('Strenuous', 30, -3),
            new Pace('Grueling', 10, -8),
            new Pace('Resting', 0, 5)
        ]
    }
}


var test = new Pace();

console.log(test.createPaceList());