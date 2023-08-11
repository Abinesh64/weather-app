import { useState } from "react";
import Search from "./components/search";
import './App.css'
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL } from "./api";
import { WEATHER_API_KEY } from "./api";

function App(){
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const handleonSearchChange = (searchData) => {
        
        const [lat, lon] = searchData.value.split(' ');

        const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`)
        const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`)

         Promise.all([currentWeatherFetch, forecastFetch])
         .then(async (res)=>{
            const weatherResponse = await res[0].json();
            const forecastResponse = await res[1].json();
            setCurrentWeather({city: searchData.label, ...weatherResponse})
            setForecast({city: searchData.label, ...forecastResponse})
        })
        .catch((err)=>console.log(err))
    }    

    console.log(currentWeather)
    console.log(forecast)
    
    return (
        <div className="container">
            <Search onSearchChange={handleonSearchChange}/>
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {forecast && <Forecast data={forecast} />}
        </div>
    )
}
export default App