import React from 'react';
import { Line } from 'react-chartjs-2';

import moment from "moment";
import { Paper, Typography } from '@material-ui/core';

export default class HourlyChart extends React.Component {


    state = {
        data: true,
        labels: ['January', 'February', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            }
        ]
    }


    componentDidMount = () => {

        const { hourly1, hourly2 } = this.props.hourlyData.hourlyData
        const hourly = this.state.data ? hourly1 : hourly2;
        if (hourly) {
            var x = 60; //minutes interval
            var times = []; // time array
            var tt = 0; // start time
            var ap = ['AM', 'PM']; // AM-PM

            //loop to increment the time and push results in array
            for (var i = 0; tt < 24 * 60; i++) {
                var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
                var mm = (tt % 60); // getting minutes of the hour in 0-55 format
                times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
                tt = tt + x;
            }

            let dataset = [];
            let set = [];

            hourly.forEach((hour, i) => {
                if (i < 24) {
                    const celsius = Math.round(hour.temp - 273.5);
                    set.push(celsius);
                }
            });
            dataset[0] = { ...this.state.datasets[0], data: set }
            this.setState({ labels: times, datasets: dataset, data: !this.state.data })
        }
        // })
    }

    render() {

        const { todayWeather } = this.props;

        const { pressure, humidity, temp, weather, sunrise, sunset } = todayWeather;

        const temp1 = Math.round(temp.eve - 273.5);
        const image = weather[0].icon;

        return (
            <Paper style={{ marginTop: "40px" }} elevation={3} >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: `space-around` }}>
                    <Typography variant={"h3"}>{temp1 + "°"}</Typography>
                    <Typography>
                        <img src={require(`../assets/${image}.png`)} alt="..."
                            style={{ maxHeight: '60px' }}
                        />
                    </Typography>
                </div>

                <div style={{}} className='chart_container'>
                    <Line
                        data={this.state}
                        options={{
                            title: {
                                display: true,
                                text: 'Average Rainfall per month',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                            , scales: {
                                yAxes: [{
                                    display: false,
                                    ticks: {
                                        suggestedMin: 20,
                                        suggestedMax: 45
                                    }
                                }]
                            }
                        }}
                    />
                </div>

                <Typography style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '15px', marginBottom: '15px', textAlign: 'left' }}>
                    <Paper variant="outlined"
                        style={{ padding: '20px', backgroundColor: "#b8ffef" }}>
                        <Typography variant='h5'>
                            Pressure
                        <Typography variant='h6'>
                                {pressure + " hpa"}
                            </Typography>
                        </Typography>
                    </Paper>
                    <Paper variant="outlined" square
                        style={{ padding: '20px', backgroundColor: '#b8ffef' }}
                    >
                        <Typography variant='h5'>
                            Humidity
                            </Typography>
                        <Typography variant='h6'>
                            {humidity + " %"}
                        </Typography>
                    </Paper>
                </Typography>

                <Typography style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '15px', marginBottom: '15px', textAlign: 'left' }}>
                    <Paper variant="outlined"
                        style={{ padding: '20px', }}>
                        <img src={require("../assets/mountain_sunrise.png")} alt="..." style={{ width: '50px' }} />

                        <Typography variant='h5'>
                            Sunrise
                        </Typography>

                        <Typography variant='h6'>
                            {moment(sunrise).format('hh:mm a')}
                        </Typography>

                    </Paper>
                    <Paper variant="outlined" square
                        style={{ padding: '20px' }}
                    >
                        <img src={require("../assets/sunset.png")} alt="..." style={{ width: '50px' }} />

                        <Typography variant='h5'>
                            Sunset
                            </Typography>
                        <Typography variant='h6'>
                            {moment(sunset).format('hh:mm a')}
                        </Typography>
                    </Paper>
                </Typography>
            </Paper>
        );
    }
}
