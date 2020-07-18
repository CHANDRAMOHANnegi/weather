import React from 'react';
import { Line } from 'react-chartjs-2';

import moment from "moment";
import { Paper, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

export default class HourlyChart extends React.Component {

    state = {

        labels: [],
        datasets: [
            {

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
        const hourlyData = this.props.hourlyData
        if (hourlyData) {
            var x = 60; //minutes interval
            var times = []; // time array
            var tt = 0; // start time
            var ap = ['AM', 'PM']; // AM-PM

            //loop to increment the time and push results in array
            for (var i = 0; tt < 24 * 60; i++) {
                var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
                times[i] = ((hh % 12)) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
                tt = tt + x;
            }

            let dataset = [];
            let set = [];

            hourlyData.forEach((hour, i) => {
                if (i < 24) {
                    const celsius = Math.round(hour.temp - 273.5);
                    set.push(celsius);
                }
            });
            dataset[0] = { ...this.state.datasets[0], data: set }
            this.setState({ labels: times, datasets: dataset })
        }
    }


    render() {
        const { todayWeather } = this.props;
        const { pressure, humidity, temp, weather, sunrise, sunset } = todayWeather;
        const temp1 = Math.round(temp.eve - 273.5);
        const imgURL = `owf owf-${weather[0].id} owf-5x`

        return (

            <Paper style={{ marginTop: "1px", padding: '15px', borderRadius: '10px' }} elevation={1} >
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: `start`, paddingTop: '10px' }}>
                    <Typography variant={"h3"} style={{ fontWeight: '700' }}>{temp1 + "°C"}</Typography>
                    <Typography style={{ marginLeft: '40px' }}>
                        <i className={imgURL} alt="..."
                            style={{ maxHeight: '60px' }} />
                    </Typography>
                </Box>

                <Box className='chart_container'>
                    <Box class="slider_component">
                        <Box class="slider">
                            <Box className='slider_children'>
                                <Line
                                    data={this.state}
                                    options={{
                                        title: {
                                            display: true,
                                            fontSize: 20
                                        },
                                        maintainAspectRatio: true,
                                        legend: {
                                            display: false,
                                        },
                                        scales: {
                                            yAxes: [{
                                                display: false,
                                                ticks: {
                                                    suggestedMin: 20,
                                                    suggestedMax: 45
                                                }
                                            }]
                                            , gridLines: {
                                                color: "blue"
                                            },
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Typography
                    style={{
                        display: 'flex', flexDirection: 'row',
                        justifyContent: 'space-around', marginTop: '1px', marginBottom: '15px', textAlign: 'left'
                    }}>
                    <Paper variant="outlined"
                        style={{ padding: '10px', backgroundColor: "rgb(239, 255, 251)", width: '30%' }} >
                        <Typography  >
                            Pressure
                        <Typography  >
                                {pressure + " hpa"}
                            </Typography>
                        </Typography>
                    </Paper>
                    <Paper variant="outlined" square
                        style={{ padding: '10px', backgroundColor: 'rgb(239, 255, 251)', width: '30%' }}>
                        <Typography  >
                            Humidity
                            </Typography>
                        <Typography >
                            {humidity + " %"}
                        </Typography>
                    </Paper>
                </Typography>

                <Typography style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', marginTop: '1px',
                    marginBottom: '15px', textAlign: 'left'
                }}>
                    <Paper variant="outlined"
                        style={{ padding: '15px 20px', }}>
                        <img src={require("../assets/mountain_sunrise.png")}
                            alt="..." style={{ width: '50px' }} />
                        <Typography variant='h5'>
                            Sunrise
                        </Typography>

                        <Typography variant='h6'>
                            {moment.unix(sunrise).format('hh:mm a')}
                        </Typography>
                    </Paper>
                    <Paper variant="outlined" square
                        style={{ padding: '15px 20px' }}>
                        <img src={require("../assets/sunset.png")} alt="..." style={{ width: '50px' }} />
                        <Typography variant='h5'>
                            Sunset
                            </Typography>
                        <Typography variant='h6'>
                            {moment.unix(sunset).format('hh:mm a')}
                        </Typography>
                    </Paper>
                </Typography>
            </Paper>


        );
    }
}
