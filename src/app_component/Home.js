import React, { useState, useEffect } from 'react';
import SearchButton from './SeachButton';

// API key of the google map
const GOOGLE_MAP_API_KEY = 'AIzaSyCp8Z7yuvwUud3KyBdUkQsq8M3ysD9eXxQ';

// load google map script
const loadGoogleMapScript = (callback) => {
    if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
        callback();
    } else {
        const googleMapScript = document.createElement("script");
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener("load", callback);
    }
}

const Home = () => {
    const [loadMap, setLoadMap] = useState(false);

    useEffect(() => {
        loadGoogleMapScript(() => {
            setLoadMap(true)
        });
    }, []);

    return (
        <div className="App">
            {!loadMap ? <div>Loading...</div> : <SearchButton />}

            
        </div>
    );
}

export default Home;

  // AIzaSyCp8Z7yuvwUud3KyBdUkQsq8M3ysD9eXxQ
    // apiKey: 'AIzaSyCp8Z7yuvwUud3KyBdUkQsq8M3ysD9eXxQ'