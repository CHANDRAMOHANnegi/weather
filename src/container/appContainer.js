import React, { useContext } from 'react';
import DayCard from '../app_component/DayCard';
import HourlyChart from '../app_component/HourlyChart';
import { CurrentWeatherContext } from '../_context/currentWeatherContext';
import { CircularProgress } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { LocationContext } from '../_context/locationContext';
import SearchButton from '../app_component/SeachButton';

const AppContainer = () => {

    const locationContext = useContext(LocationContext);
    const { position } = locationContext.location;

    return (
        <CurrentWeatherContext.Consumer>{
            (context) => {
                const currentWeather = context.currentWeather;
                if (currentWeather) {
                    const dailyData = currentWeather.dailyData
                    const hourlyData = currentWeather.hourlyData
                    const setSelectedDayWeather = context.setSelectedDayWeather;
                    return (
                        <Container>
                            {!position ?
                                <CircularProgress /> :
                                <SearchButton position={position}
                                    setCurrentLocation={locationContext.setCurrentLocation} />}
                            <DayCard
                                dailyData={dailyData}
                                setSelectedDayWeather={setSelectedDayWeather}
                            />
                            <HourlyChart
                                todayWeather={context.selectedDayWeather}
                                hourlyData={hourlyData} />
                        </Container>
                    )
                } else {
                    return <CircularProgress size={50} />
                }
            }}
        </CurrentWeatherContext.Consumer>
    )
}

export default AppContainer;