import React, { useEffect, useRef, useState } from "react";

import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';

const SearchButton = (props) => {
  const placeInputRef = useRef(null);

  const [value, setValue] = useState('');

  useEffect(() => {

    let v = props.position.city + " , " + props.position.country
    setValue(v)
    initPlaceAPI();

  }, [props]);

  // initialize the google place autocomplete
  const initPlaceAPI = () => {

    let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
    new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
      let place = autocomplete.getPlace();

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
      props.setCurrentLocation(position);
    });
  };

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