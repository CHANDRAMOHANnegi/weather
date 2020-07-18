import React, { createContext, useState, useEffect, useContext } from 'react';
import { LocationContext } from './locationContext';
import axios from 'axios'

export const CurrentWeatherContext = createContext();

const CurrentWeatherContextProvider = (props) => {

    const locationContext = useContext(LocationContext);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [selectedDayWeather, setSelectedDayWeather] = useState(null);

    useEffect(() => {
        const location = locationContext.location;
        if (location) {
            let { lat, lon } = location.position
            lat = lat ? lat : "28.541100";
            lon = lon ? lon : "77.281677";

            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=429736441cf3572838aa10530929f7cd`

            axios.get(url)
                .then(function (res) {
                    let dailyData = res.data.daily.slice(0, 7);
                    setSelectedDayWeather(dailyData[0])
                    setCurrentWeather({
                        hourlyData: res.data.hourly,
                        dailyData: dailyData
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, [locationContext.location]);

    return (
        <CurrentWeatherContext.Provider
            value={{ currentWeather, setCurrentWeather, selectedDayWeather, setSelectedDayWeather }}>
            {props.children}
        </CurrentWeatherContext.Provider>
    );
}


export default CurrentWeatherContextProvider;