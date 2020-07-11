import React, { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

const LocationContextProvider = (props) => {

  const [location, setLocation] = useState("");

  const setCurrentLocation = (location) => {
    console.log(location);
    setLocation({ position: location })
  };

  useEffect(() => {

    fetch('http://ip-api.com/json')
      .then(res => res.json()).then(data => {
        const { city, country, lat, lon } = data;
        setLocation({ position: { city, country, lat, lon } })
        // console.log(data);
      }).catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, setCurrentLocation }}>
      {props.children}
    </LocationContext.Provider>
  );
}


export default LocationContextProvider;