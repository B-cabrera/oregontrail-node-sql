class Weather {

    // Weather has a name, dec num for percentage of mile change, health change, and probabilty, boolean if severe or not
    constructor(num, name, mileEffect, healthEffect, probability, severeBool) {
        this.id = num;
        this.weather = name;
        this.mileChange = mileEffect;
        this.healthChange = healthEffect;
        this.chance = probability;
        this.isSevere = severeBool;
    }


    // Creates array of weather obj, all for current game
    createWeatherList() {
        return [
            new Weather(0, 'Clear', 0, 0, 0.5, false),
            new Weather(1, 'Cloudy', 0, 0, 0.3, false),
            new Weather(2, 'Rain', 0.1, 0.05, 0.1, false),
            new Weather(3, 'Heavy Rain', 0.2, 0.1, 0.1, true),
            new Weather(4, 'Fog', 0.05, 0.03, 0.05, false),
            new Weather(5, 'Heavy Fog', 0.1, 0.05, 0.05, true),
            new Weather(6, 'Snow', 0.2, 0.1, 0.05, true),
            new Weather(7, 'Hail', 0.3, 0.15, 0.02, true),
            new Weather(8, 'Sleet', 0.2, 0.1, 0.02, true),
            new Weather(9, 'Blowing snow', 0.4, 0.2, 0.01, true),
            new Weather(10, 'Blizzard', 0.6, 0.3, 0.01, true),
            new Weather(11, 'Thunderstorm', 0.2, 0.1, 0.01, true),
            new Weather(12, 'Tornado', 0.4, 0.2, 0.01, true)
        ];
    }

}

// EXPORTING INSTANCE OF WEATHER OBJ
exports.Weather = new Weather();


