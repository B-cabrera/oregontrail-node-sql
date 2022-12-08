class Pace {

   // Pace has a name, num of mile change, and num of health change 
    constructor(num, title, distance, healthEffect) {
        this.id = num
        this.name = title;
        this.mileChange = distance;
        this.healthChange = healthEffect;
    }



    // method creates list of Pace obj's, all for current game
    createPaceList() {
        return [
            new Pace(0, 'Steady', 50, -1),
            new Pace(1, 'Strenuous', 30, -3),
            new Pace(2,'Grueling', 10, -8),
            new Pace(3,'Resting', 0, 5)
        ]
    }
}

// EXPORTING INSTANCE OF PACE OBJ
exports.Pace = new Pace();