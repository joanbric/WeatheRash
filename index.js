import {
    getCurrentWeatherByCoords,
    getCurrentWeatherByCityId,
} from "./weather.js";
import { getLocation } from "./location.js";
import { getCityByName } from "./cities.js";

const divTemp = document.querySelector("#temp");
const divFeel = document.querySelector("#feel");
const txtCity = document.querySelector("#txtCity");
const lstCities = document.querySelector("ul#lstCities");
let byCityName = false;

async function init() {
    let lat, lon;

    try {
        const position = await getLocation();

        lat = position.coords.latitude;
        lon = position.coords.longitude;
    } catch (err) {
        if (err.code != 1) {
            byCityName = true;
        } else {
            console.error(err);
        }
    }

    function createCityItem(country, region, city_name, lat, lon) {
        country = country + ",";
        region = region != "" ? region + ", " : "";

        const city = document.createElement("li");
        const cityName = document.createElement("span");
        const cityCoords = document.createElement("span");
        const br = document.createElement("br");

        city.className = "city-item";

        cityName.className = "city-item__city-name city-name";
        cityCoords.className = "city-item__city-coords city-coords";

        cityName.textContent = `${country} ${region}${city_name}`;
        cityCoords.textContent = `Lat.:${lat} Lon.:${lon}`;

        city.appendChild(cityName);
        city.appendChild(br);
        city.appendChild(cityCoords);

        return city;
    }

    const addCityItem = (city) => {
        lstCities
            .appendChild(
                createCityItem(
                    city.country,
                    city.state,
                    city.name,
                    city.coord.lat,
                    city.coord.lon
                )
            )
            .addEventListener("click", async () => {
                txtCity.value = city.name;

                const currentWeather = await getCurrentWeatherByCityId(city.id);
                divTemp.textContent =
                    "The temperature is " + currentWeather.main.temp;
                divFeel.textContent =
                    "The term feel is " + currentWeather.main.feels_like;

                lstCities.innerHTML = "";
                lstCities.style.display = "none";
            });
    };

    const searchCity = async (e) => {
        let ciudades = await getCityByName(e.target.value);

        if (e.target.value === "") lstCities.innerHTML = "";

        if (ciudades.length <= 40 && ciudades.length > 0) {
            if (lstCities.style.display == "none")
                lstCities.style.display = "block";
            lstCities.innerHTML = "";
            ciudades.forEach(addCityItem);
        }
    };

    txtCity.addEventListener("input", searchCity);
    if (!byCityName){
        const currentWeather = await getCurrentWeatherByCoords(lat, lon);
        divTemp.textContent =
        "The temperature is " + currentWeather.main.temp;
    divFeel.textContent =
        "The term feel is " + currentWeather.main.feels_like;
        
        txtCity.value = currentWeather.name;
        console.log(currentWeather.name);
        lstCities.innerHTML = "";
        lstCities.style.display = "none";
    }
}

init();
