import React, { useEffect, useRef, useState } from "react";
 
const SearchButton = () => {
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);
 
  useEffect(() => {


    initPlaceAPI();

  }, []);
 
  // initialize the google place autocomplete
  const initPlaceAPI = () => {

    let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
    new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
      let place = autocomplete.getPlace();

      console.log(place);
      

      setPlace({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    });    

  };
 
  return (
    <>
      <input type="text" ref={placeInputRef} />
      {place && <div style={{ marginTop: 20, lineHeight: '25px' }}>
        <div style={{ marginBottom: 10 }}><b>Selected Place</b></div>
        <div><b>Address:</b> {place.address}</div>
        <div><b>Lat:</b> {place.lat}</div>
        <div><b>Lng:</b> {place.lng}</div>
      </div>}
    </>
  );
};
 
export default SearchButton;