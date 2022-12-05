class Terrain {

    // Terrain has an id, name, num for pace change and health change
    constructor(location, paceEffect, healthEffect) {
        this.terrain = location;
        this.paceChange = paceEffect;
        this.healthChange = healthEffect;
    }


    // Creates terrain array, all for current game
    createTerrainList() {
        return [
            new Terrain('Mountains', -20, -5),
            new Terrain('Grassland', -15, -2),
            new Terrain('Plains', -10, -1),
            new Terrain('Forest', -5, -3),
            new Terrain('Desert', 0, -4)
        ]
    }
}


// EXPORTING INSTANCE OF TERRAIN OBJ
exports.Terrain = new Terrain();