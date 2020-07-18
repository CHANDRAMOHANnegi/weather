import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';

const DayCard = ({ dailyData, setSelectedDayWeather }) => {

  const handleClick = (reading, i) => {
    setSelectedDayWeather(reading);
    setactive(i);
  }

  const [active, setactive] = useState(0);

  const Cards = dailyData.map((reading, index) => {
    let newDate = new Date();
    const weekday = reading.dt * 1000;
    newDate.setTime(weekday);
    const maxCelsius = Math.round(reading.temp.max - 273.5);
    const minCelsius = Math.round(reading.temp.min - 273.5);

    const imgURL = `owf owf-${reading.weather[0].id} owf-5x`

    return (
      <div class="slider_children" tabindex="0" key={index}>
        <Card style={{
          margin: '5px 2px',
          border: active === index ? '1px solid #0f6fff' : '',
          display: 'inline-block'
        }}
          onClick={() => handleClick(reading, index)}  >
          <CardContent>
            <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
              <h4 className="card-title">{moment(newDate).format('dddd')}</h4>
              <h6 className="card-title">{moment(newDate).format('DD/MM/Y')}</h6>
            </Typography>
            <Typography variant="h5" component="h2">
              <div><span>{maxCelsius + "°"}</span> <span>{minCelsius + "°"}</span></div>
            </Typography>
            <Typography style={{ marginBottom: 12, }} color="textSecondary">
              <i className={imgURL} alt="..."
                style={{ maxHeight: '80px' }} />
            </Typography>
            <Typography variant="body2" component="p">
              {reading.weather[0].description}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  })

  return (
    <div class="slider_component">
      <div class="slider">
        {Cards}
      </div>
    </div>
  )
}

export default DayCard;