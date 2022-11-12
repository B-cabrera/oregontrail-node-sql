class Weather {

    // Weather has a name, dec num for percentage of mile change, health change, and probabilty, boolean if severe or not
    constructor(name, mileEffect, healthEffect, probability, severeBool) {
        this.weather = name;
        this.mileChange = mileEffect;
        this.healthChange = healthEffect;
        this.chance = probability;
        this.isSevere = severeBool;
    }


    // Creates array of weather obj, all for current game
    createWeatherList() {
        return [
            new Weather('Clear', 0, 0, 0.5, false),
            new Weather('Cloudy', 0, 0, 0.3, false),
            new Weather('Rain', 0.1, 0.05, 0.1, false),
            new Weather('Heavy Rain', 0.2, 0.1, 0.1, true),
            new Weather('Fog', 0.05, 0.03, 0.05, false),
            new Weather('Heavy Fog', 0.1, 0.05, 0.05, true),
            new Weather('Snow', 0.2, 0.1, 0.05, true),
            new Weather('Hail', 0.3, 0.15, 0.02, true),
            new Weather('Sleet', 0.2, 0.1, 0.02, true),
            new Weather('Blowing snow', 0.4, 0.2, 0.01, true),
            new Weather('Blizzard', 0.6, 0.3, 0.01, true),
            new Weather('Thunderstorm', 0.2, 0.1, 0.01, true),
            new Weather('Tornado', 0.4, 0.2, 0.01, true)
        ];
    }

}

// EXPORTING INSTANCE OF WEATHER OBJ
exports.Weather = new Weather();


