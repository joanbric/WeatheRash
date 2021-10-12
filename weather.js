import { getCityId } from "./cities.js";
import { APIKEY_OPENWEATHER } from "./constants.js";


export async function getCurrentWeatherByCityId(cityId) {
    try {
        const request = new Request(
            `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${APIKEY_OPENWEATHER}&units=metric`
        );

        const response = await fetch(request);
        if(!response.ok){
            throw new Error(`Ocurrio un problema con la consulta\n  ${response.type}` );
        }
        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err)
    }
}

export async function getCurrentWeatherByCoords(lat, lon){
    try {
        const request = new Request(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY_OPENWEATHER}&units=metric`
        );

        const response = await fetch(request);
        if(!response.ok){
            throw new Error(`Ocurrio un problema con la consulta\n  ${response.type}` );
        }
        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err)
    }
}



