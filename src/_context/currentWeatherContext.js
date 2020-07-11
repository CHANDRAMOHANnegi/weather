import React, { createContext, useState, useEffect, useContext } from 'react';
import { LocationContext } from './locationContext';

export const CurrentWeatherContext = createContext();

const CurrentWeatherContextProvider = (props) => {

    const locationContext = useContext(LocationContext);
    console.log(locationContext);

    const [currentWeather, setCurrentWeather] = useState(null);
    const [selectedDayWeather, setSelectedDayWeather] = useState(null);

    const setcurrentweather = (weather) => {
        console.log(weather);
        setCurrentWeather(weather)
    };

    const setselecteddayWeather = (weather) => {
        console.log(weather);
        setSelectedDayWeather(weather)
    };

    useEffect(() => {

        console.log(locationContext);

        const location = locationContext.location;
 
        if (location) {


            let { country, city, lat, lon } = location.position
            // console.log("0000000000000000000000000000000000000", country, city)

            // console.log("===================================", country, city);

            country = country ? country : 'In';
            city = city ? city : 'Delhi';


            lat = lat ? lat : "28.541100";
            lon = lon ? lon : "77.281677";

            // let y = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=429736441cf3572838aa10530929f7cd`

            const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=429736441cf3572838aa10530929f7cd`

            fetch(weatherURL)
                .then(res => res.json())
                .then(data => {
                    console.log("===================", data);
                    const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                    setCurrentWeather({
                        fullData: data.list,
                        dailyData: dailyData
                    })
                    setSelectedDayWeather(dailyData[0])
                })
        }

    }, [locationContext.location.position]);

    return (
        <CurrentWeatherContext.Provider
            value={{ currentWeather, setcurrentweather, selectedDayWeather, setselecteddayWeather }}>
            {props.children}
        </CurrentWeatherContext.Provider>
    );
}


export default CurrentWeatherContextProvider;