import React from "react";
import "./App.css";
import LocationContextProvider from "./_context/locationContext";
import CurrentWeatherContextProvider from "./_context/currentWeatherContext";
import { Typography } from "@material-ui/core";
import AppContainer from "./container/appContainer";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Typography variant='h4'>Weather App
         <a href="https://github.com/CHANDRAMOHANnegi/weather" target="_blank">
            <img style={{ height: '25px', width: '25px', marginLeft: '10px' }}
              src={require("./assets/github.png")} alt="github" />
          </a>
        </Typography>
        <LocationContextProvider>
          <CurrentWeatherContextProvider>
            <AppContainer />
          </CurrentWeatherContextProvider>
        </LocationContextProvider>
      </div>
    );
  }
}

export default App;

