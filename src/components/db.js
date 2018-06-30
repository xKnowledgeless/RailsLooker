const db = {
    "trains" : [
        {
            "number" : 1,
            "name" : "АдлерскиеГрузовыеПеревозки",
            "type" : 1,
            "allCarriage" : 100,
            "fullCarriage" : 100,
            "freightOptions" : {
                "cargo" : "Смола",
                "cargoWeight" : 5000,
                "cargoUnit" : 1
            },
            "status" : false,
            "curCoordinates" : [
                48.201643,
                39.974158
            ],
            "dep" : {
                "place": "Адлер",
                "coordinates": [
                    43.4343234,
                    39.93394620000004
                ],
                "date": "01.01.2001 57:48"
            },
            "arr" : {
                "place": "Москва",
                "coordinates": [
                    55.755826,
                    37.617299900000035
                ],
                "date": "-"
            },
            "path" : [
                [45.03926740000001, 38.98722090000001],
                [47.23571369999999, 39.701505],
                [48.201643, 39.974158],
                [51.6754966, 39.20888230000003],
                [54.6095418, 39.71258569999998]
            ]
        },
        {
            "number" : 2,
            "name" : "БелоРоссы",
            "type" : 2,
            "allCarriage" : 100,
            "fullCarriage" : 100,
            "freightOptions" : null,
            "status" : false,
            "curCoordinates" : [
                55.496948,
                36.017409
            ],
            "dep" : {
                "place": "Минск",
                "coordinates": [
                    53.90453979999999,
                    27.561524400000053
                ],
                "date": "01.01.2001 57:48"
            },
            "arr" : {
                "place": "Москва",
                "coordinates": [
                    55.755826,
                    37.617299900000035
                ],
                "date": "-"
            },
            "path" : [
                [53.940319, 27.774330899999995],
                [54.0957845, 28.328807299999994],
                [54.3003121, 29.070216500000015],
                [54.7903112, 32.05036629999995],
                [55.496948, 36.017409]
            ]
        }
    ]
};

export default db.trains.map(train => {
    train.number = train.number + "";
    train.type = (train.type === 1) ? "Грузовой" : "Пассажирский";
    train.route = train.dep.place + "-" + train.arr.place;
    train.status = (train.status) ? "Прибыл": "В пути";

    return train;
});