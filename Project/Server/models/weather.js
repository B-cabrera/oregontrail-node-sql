class Weather {

    constructor(weatherNum, name, mileEffect, healthEffect, probability, severeBool) {
        this.id = weatherNum;
        this.weather = name;
        this.mileChange = mileEffect;
        this.healthChange = healthEffect;
        this.chance = probability;
        this.isSevere = severeBool;
    }


    createWeatherList() {
        return [
            new Weather(1, 'Clear', 0, 0, 0.5, false),
            new Weather(2, 'Cloudy', 0, 0, 0.3, false),
            new Weather(3, 'Rain', 0.1, 0.05, 0.1, false),
            new Weather(4, 'Heavy Rain', 0.2, 0.1, 0.1, true),
            new Weather(5, 'Fog', 0.05, 0.03, 0.05, false),
            new Weather(6, 'Heavy Fog', 0.1, 0.05, 0.05, true),
            new Weather(7, 'Snow', 0.2, 0.1, 0.05, true),
            new Weather(8, 'Hail', 0.3, 0.15, 0.02, true),
            new Weather(9, 'Sleet', 0.2, 0.1, 0.02, true),
            new Weather(10, 'Blowing snow', 0.4, 0.2, 0.01, true),
            new Weather(11, 'Blizzard', 0.6, 0.3, 0.01, true),
            new Weather(12, 'Thunderstorm', 0.2, 0.1, 0.01, true),
            new Weather(13, 'Tornado', 0.4, 0.2, 0.01, true)
        ];
    }

}


