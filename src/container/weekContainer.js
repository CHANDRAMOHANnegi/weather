import React from 'react';
import DayCard from '../app_component/weekweather/DayCard';

class WeekContainer extends React.Component {
    state = {
        fullData: [],
        dailyData: []
    }

    componentDidMount = () => {

        console.log(this.props);

        let country = 'In';
        let city = 'Delhi'

        let lat = "28.541100";
        let long = "77.281677";



        let y = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=429736441cf3572838aa10530929f7cd`

        const weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=Delhi,iN&APPID=429736441cf3572838aa10530929f7cd"

        fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))



                this.setState({
                    fullData: data.list,
                    dailyData: dailyData
                }, () => console.log(this.state))
            })
    }

    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
    }

    render() {
        return (
            <div className="container">

                <div className="row justify-content-center">

                    {this.formatDayCards()}

                </div>
            </div>
        )
    }
}

export default WeekContainer;