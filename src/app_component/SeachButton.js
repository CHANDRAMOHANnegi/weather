import React, { useEffect, useRef, useState, useContext } from "react";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { LocationContext } from "../_context/locationContext";


const SearchButton = (props) => {
  const placeInputRef = useRef(null);

  const context = useContext(LocationContext);

  const position = props.position;

  const [place, setPlace] = useState(null);

  useEffect(() => {


    initPlaceAPI();

  }, [props]);

  // initialize the google place autocomplete
  const initPlaceAPI = () => {

    let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
    new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
      let place = autocomplete.getPlace();

      console.log(place);

      const places = place.formatted_address.split(',');

      const city = places[0];
      const country = places[places.length - 1];

      const position = {
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng(),
        city,
        country

      }
      console.log(position);

      props.setCurrentLocation(position);
      setPlace({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    });

  };

  return (
    <React.Fragment>

      <FormControl >
        <Input
          id="input-with-icon-adornment"
          inputRef={placeInputRef}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      {place && <div style={{ marginTop: 20, lineHeight: '25px' }}>
        <div style={{ marginBottom: 10 }}><b>Selected Place</b></div>
        <div><b>Address:</b> {place.address}</div>
        <div><b>Lat:</b> {place.lat}</div>
        <div><b>Lng:</b> {place.lng}</div>
      </div>}
    </React.Fragment>
  );
};

export default SearchButton;