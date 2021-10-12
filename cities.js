import CITIESDB from "./city.list.js";

export const SAP_ID = CITIESDB.cities.find(
    (item) => item.name == "San Pedro Sula"
).id;

export function getCityId(cityName) {
    return new Promise((resolve, reject) => {
        const cityId = CITIESDB.cities.find((city) => city.name == cityName);

        if (cityId == undefined) {
            reject(
                new Error(
                    `No se ha encontrado el nombre de la ciudad ${cityName}`
                )
            );
        }
        resolve(cityId);
    });
}

export function getCityByName(name) {
    return new Promise((resolve, reject) => {
        try {
            let filterFn = (city) => (city.name.toLowerCase().includes(name.toLowerCase()) ? true : false);

            resolve(CITIESDB.cities.filter(filterFn));
        } catch (err) {
            reject(new Error(err))
        }
    });
}
