class Pace {

   // Pace has a name, num of mile change, and num of health change 
    constructor(title, distance, healthEffect) {
        this.name = title;
        this.mileChange = distance;
        this.healthChange = healthEffect;
    }



    // method creates list of Pace obj's, all for current game
    createPaceList() {
        return [
            new Pace('Steady', 50, -1),
            new Pace('Strenuous', 30, -3),
            new Pace('Grueling', 10, -8),
            new Pace('Resting', 0, 5)
        ]
    }
}

// EXPORTING INSTANCE OF PACE OBJ
exports.Pace = new Pace();