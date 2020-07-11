import React, { useState, useLayoutEffect, useEffect } from 'react';
import { CurrentWeatherContext } from '../../_context/currentWeatherContext';
import { useContext } from 'react';
import Card from '@material-ui/core/Card';
// import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import Icons from '../../util/Images';
import img from '../../assets/10n.png';
import { Grid, Paper, GridList, GridListTile } from '@material-ui/core';
var moment = require('moment');


const DayCard = ({ reading, degreeType }) => {
  const context = useContext(CurrentWeatherContext);

  const currentWeather = context.currentWeather;
  const setselecteddayWeather = context.setselecteddayWeather;
  // console.log(context);
  const dailyData = currentWeather.dailyData;
  const [cols, setCols] = useState(7);

  //     {/* <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p> */}

  const handleClick = (reading) => {
    setselecteddayWeather(reading)
  }

  const updateSize = () => {
    console.log(window.innerWidth);

    if (window.innerWidth < 400) {
      setCols(2);
    } else if (window.innerWidth < 750) {
      setCols(3);
    } else
    if (window.innerWidth < 850) {
      setCols(4);
    } else
      if (window.innerWidth < 1000) {
        setCols(5);
      }

  }

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
  });


  const Cards = dailyData.map((reading, index) => {
    let newDate = new Date();
    const weekday = reading.dt * 1000
    newDate.setTime(weekday)

    // const celsius = Math.round((fahrenheit - 32) * 5 / 9);
    const maxCelsius = Math.round(reading.temp.max - 273.5);
    const minCelsius = Math.round(reading.temp.min - 273.5);

    // console.log('======================================================');
    return (
      <GridListTile key={index} style={{ height: '250px' }}>
        <Card style={{ minWidth: '120px', margin: '5px 2px', display: 'inline-block' }} onClick={() => handleClick(reading)}   >
          <CardContent>
            <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
              <h4 className="card-title">{moment(newDate).format('dddd')}</h4>
            </Typography>
            <Typography variant="h5" component="h2">
              <div><span>{maxCelsius + "°"}</span> <span>{minCelsius + "°"}</span></div>
            </Typography>
            <Typography style={{ marginBottom: 12, }} color="textSecondary">
              <img src={require(`../../assets/${reading.weather[0].icon}.png`)} alt="..."
                style={{ maxHeight: '80px' }}
              />
            </Typography>
            <Typography variant="body2" component="p">
              {reading.weather[0].description}
            </Typography>
          </CardContent>
        </Card>
      </GridListTile >
    )
  })

  console.log(window.innerWidth);



  return (
    <div >
      <GridList style={{
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
      }}
        cols={cols}
        spacing={2} >
        {Cards}

      </GridList>
    </div>
  )
}

export default DayCard;