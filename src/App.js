import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Home from "./app_component/Home";
import LocationContextProvider from "./_context/locationContext";
import CurrentWeatherContextProvider from "./_context/currentWeatherContext";
import { Typography } from "@material-ui/core";
 
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Typography variant='h4'>Weather App</Typography>
        <LocationContextProvider>
          <CurrentWeatherContextProvider>
            <Home />
          </CurrentWeatherContextProvider>
        </LocationContextProvider>
      </div>
    );
  }
}

export default App;

