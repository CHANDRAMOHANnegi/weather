import React from 'react';
import { CurrentWeatherContext } from '../../_context/currentWeatherContext';
import { useContext } from 'react';
import Card from '@material-ui/core/Card';
// import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import Icons from '../../util/Images';
import img from '../../assets/10n.png';
import { Grid } from '@material-ui/core';
var moment = require('moment');


const DayCard = ({ reading, degreeType }) => {
  const context = useContext(CurrentWeatherContext);

  const currentWeather = context.currentWeather;
  const setselecteddayWeather = context.setselecteddayWeather;
  console.log(context);
  const dailyData = currentWeather.dailyData;

  //     {/* <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p> */}

const handleClick=(reading)=>{
  setselecteddayWeather(reading)

}

  const Cards = dailyData.map(reading => {

    let newDate = new Date();
    const weekday = reading.dt * 1000
    newDate.setTime(weekday)

    // const celsius = Math.round((fahrenheit - 32) * 5 / 9);
    const maxCelsius = Math.round(reading.main.temp_max - 273.5);
    const minCelsius = Math.round(reading.main.temp_min - 273.5);

    const imgURL = `owf owf-${reading.weather[0].id} owf-5x`

    // console.log('======================================================');
    return (
      <Card style={{}} onClick={()=>handleClick(reading)}  >
        <CardContent>
          <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
            <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
          </Typography>
          <Typography variant="h5" component="h2">
            <div><span>{maxCelsius + "°"}</span> <span>{minCelsius + "°"}</span></div>
          </Typography>
          <Typography style={{ marginBottom: 12, }} color="textSecondary">
            <img src={require(`../../assets/${reading.weather[0].icon}.png`)} alt="..."
              style={{ maxHeight: '100px' }}
            />
          </Typography>
          <Typography variant="body2" component="p">
            {reading.weather[0].description}
          </Typography>
        </CardContent>
      </Card>

    )
  })


  return (

    <div
      style={{ display: 'flex', flexDirection: 'row',
      justifyContent:'center'

    }}
    >
      {/* <Grid container spacing={3}
      >
        <Grid item 
        style={{display:'flex',flexDirection:'row'}}> */}
      {Cards}
      {/* </Grid>
      </Grid> */}
    </div>

  )
}

export default DayCard;