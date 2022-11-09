class Terrain {

    constructor(terrainNum, location, paceEffect, healthEffect) {
        this.id = terrainNum;
        this.terrain = location;
        this.paceChange = paceEffect;
        this.healthChange = healthEffect;
    }


    createTerrainList() {
        return [
            new Terrain(1, 'Mountains', -20, -5),
            new Terrain(2, 'Grassland', -15, -2),
            new Terrain(3, 'Plains', -10, -1),
            new Terrain(4, 'Forest', -5, -3),
            new Terrain(5, 'Desert', 0, -4)
        ]
    }
}

