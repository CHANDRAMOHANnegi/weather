import React, { useEffect, useRef, useState, useContext } from "react";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { LocationContext } from "../_context/locationContext";
import { TextField } from "@material-ui/core";

import LocationOnIcon from '@material-ui/icons/LocationOn';

const SearchButton = (props) => {
  const placeInputRef = useRef(null);

  const [value, setValue] = useState('');

  useEffect(() => {

    console.log(props);
    

    let v = props.position.city + " , " + props.position.country
    setValue(v)
    initPlaceAPI();

  }, [props]);

  // initialize the google place autocomplete
  const initPlaceAPI = () => {
console.log('----------------------------',placeInputRef.current);

    let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
    new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
      let place = autocomplete.getPlace();

      // console.log(place);

      const places = place.formatted_address.split(',');

      const city = places[0];
      const country = places[places.length - 1];

      const position = {
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng(),
        city,
        country

      }

      setValue()

      console.log(props.position.city + " , " + props.position.country);

      props.setCurrentLocation(position);
      // setPlace({
      //   address: place.formatted_address,
      //   lat: place.geometry.location.lat(),
      //   lng: place.geometry.location.lng()
      // });
    });

  };

  console.log(value);



  return (
    <React.Fragment>

      <FormControl >
        <TextField
          id="input-with-icon-adornment"
          variant="outlined"
          onChange={e => setValue(e.target.value)}
          value={value}
          inputRef={placeInputRef}
          startAdornment={
            <InputAdornment position="start">
              <LocationOnIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </React.Fragment>
  );
};

export default SearchButton;