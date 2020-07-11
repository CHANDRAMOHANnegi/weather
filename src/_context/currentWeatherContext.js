import React, { createContext, useState, useEffect, useContext } from 'react';
import { LocationContext } from './locationContext';

export const CurrentWeatherContext = createContext();

const CurrentWeatherContextProvider = (props) => {

    const locationContext = useContext(LocationContext);
    // console.log(locationContext);

    const [currentWeather, setCurrentWeather] = useState(null);
    const [selectedDayWeather, setSelectedDayWeather] = useState(null);

    const setcurrentweather = (weather) => {
        // console.log(weather);
        setCurrentWeather(weather)
    };

    const setselecteddayWeather = (weather) => {
        // console.log(weather);
        setSelectedDayWeather(weather)
    };

    useEffect(() => {
        const location = locationContext.location;
        if (location) {
            let { lat, lon } = location.position
            lat = lat ? lat : "28.541100";
            lon = lon ? lon : "77.281677";

            let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=429736441cf3572838aa10530929f7cd`

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const dailyData = data.daily;//.filter(reading => reading.dt_txt.includes("18:00:00"))
                    setSelectedDayWeather(dailyData[0])
                    let hourly1 = data.hourly;
                    let hourly2 = hourly1.splice(24);
                    setCurrentWeather({
                        hourlyData: { hourly1, hourly2 },
                        dailyData: dailyData
                    })
                })
        }

    }, [locationContext.location]);

    return (
        <CurrentWeatherContext.Provider
            value={{ currentWeather, setcurrentweather, selectedDayWeather, setselecteddayWeather }}>
            {props.children}
        </CurrentWeatherContext.Provider>
    );
}


export default CurrentWeatherContextProvider;