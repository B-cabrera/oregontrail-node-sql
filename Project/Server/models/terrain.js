class Terrain {

    // Terrain has an id, name, num for pace change and health change
    constructor(num, location, paceEffect, healthEffect) {
        this.id = num;
        this.terrain = location;
        this.paceChange = paceEffect;
        this.healthChange = healthEffect;
    }


    // Creates terrain array, all for current game
    createTerrainList() {
        return [
            new Terrain(0,'Mountains', -20, -5),
            new Terrain(1, 'Grassland', -15, -2),
            new Terrain(2, 'Plains', -10, -1),
            new Terrain(3, 'Forest', -5, -3),
            new Terrain(4, 'Desert', 0, -4)
        ]
    }
}


// EXPORTING INSTANCE OF TERRAIN OBJ
exports.Terrain = new Terrain();