import React from 'react';
import SearchButton from './SeachButton';
import AppContainer from '../container/appContainer';
import { LocationContext } from '../_context/locationContext';
import { CircularProgress, Typography } from '@material-ui/core';

// API key of the google map
const GOOGLE_MAP_API_KEY = 'AIzaSyCp8Z7yuvwUud3KyBdUkQsq8M3ysD9eXxQ';

class Home extends React.Component {

    state = {
        map: false,
        position: {}
    }
    // load google map script
    loadGoogleMapScript = (callback) => {
        if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
            callback();
        } else {
            const googleMapScript = document.createElement("script");
            googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
            window.document.body.appendChild(googleMapScript);
            googleMapScript.addEventListener("load", callback);
        }
    }



    componentDidMount() {

        console.log("-------------------------");

        // window.onload = function () {
        //     var startPos;
        //     var geoSuccess = function (position) {
        //       startPos = position;
        //       console.log(position)
        //     //   latitude = startPos.coords.latitude;
        //     //   longitude = startPos.coords.longitude;
        //     //   locationName = " ";

        //     };
        //     var geoError = function (error) {
        //       console.log('Error occurred. Error code: ' + error.code);
        //       // error.code can be:
        //       //   0: unknown error
        //       //   1: permission denied
        //       //   2: position unavailable (error response from location provider)
        //       //   3: timed out
        //     };
        //     navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        //   };

        // fetch('http://ip-api.com/json')
        //     .then(res => res.json()).then(data => {
        //         const { city, country, lat, lon } = data;
        //         this.setState({ position: { city, country, lat, lon } })
        //         console.log(data);
        //     }).catch(err => {
        //         console.log(err);
        //     })

        this.loadGoogleMapScript(() => {
            this.setState({ map: true })
        });
    }

    render() {
        // console.log(this.state);

        // const { position } = this.state.position;

        return (
            <LocationContext.Consumer>{
                (context) => {
                    console.log(context);
                    const { position } = context.location;
                    return (
                        <div className="App">
                            {!position ? <CircularProgress /> : (
                                <SearchButton position={position} setCurrentLocation={context.setCurrentLocation} />)}
                            <AppContainer position={position} />
                        </div>)
                }}
            </LocationContext.Consumer>
        )
    }
}

export default Home;

  // AIzaSyCp8Z7yuvwUud3KyBdUkQsq8M3ysD9eXxQ
    // apiKey: 'AIzaSyCp8Z7yuvwUud3KyBdUkQsq8M3ysD9eXxQ'