import React from 'react';
import DayCard from '../app_component/weekweather/DayCard';
import HourlyChart from '../app_component/HourlyChart';
import { CurrentWeatherContext } from '../_context/currentWeatherContext';
import { CircularProgress, Paper, Typography } from '@material-ui/core';

class WeekContainer extends React.Component {
    state = {
        fullData: [],
        dailyData: []
    }

    componentDidMount = () => {

        // console.log(this.props);
        // const position = this.props;

        // let country = position.country ? position.country : 'In';
        // let city = position.city ? position.city : 'Delhi';

        // let lat = position.lat ? position.lat : "28.541100";
        // let lon = position.lon ? position.lon : "77.281677";



        // let y = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=429736441cf3572838aa10530929f7cd`

        // const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=429736441cf3572838aa10530929f7cd`

        // fetch(weatherURL)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);

        //         const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
        //         this.setState({
        //             fullData: data.list,
        //             dailyData: dailyData
        //         }, () => console.log(this.state))
        //     })
    }

    // formatDayCards = () => {
    //     return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
    // }

    render() {
        return (
            <div className="container">
                <CurrentWeatherContext.Consumer>{
                    (context) => {
                        const currentWeather = context.currentWeather;
                        console.log(context);
                        if (currentWeather) {
                            const dailyData = currentWeather.dailyData
                            return (<div>
                                <div className="row justify-content-center">
                                    {dailyData && <DayCard />}
                                </div>
                              
                                <HourlyChart  todayWeather={context.selectedDayWeather} />
                            </div>)
                        }
                        else {
                            return <CircularProgress size={50} />
                        }
                    }}
                </CurrentWeatherContext.Consumer>
            </div>
        )
    }
}

export default WeekContainer;