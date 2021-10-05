import { getCurrentWeatherByCoords } from "./weather.js";
import { getLocation } from "./location.js";

const divTemp = document.querySelector('#temp')
const divFeel = document.querySelector('#feel')
let byCityName = false;

async function init(){
    let lat, lon;

    try{
        const position = await getLocation();
        
        lat = position.coords.latitude;
        lon = position.coords.longitude;

    }catch(err){
        if(err.code != 1){
          byCityName = true;
        }else{
            console.error(err)
        }

    }

    if(byCityName){

    }else{
        
        const currentWeather = await getCurrentWeatherByCoords(lat, lon);
        divTemp.textContent = currentWeather.main.temp;
        divFeel.textContent = currentWeather.main.feels_like;
    }
  //  console.log(await getCurrentWeather());
}

init();