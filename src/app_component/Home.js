import React from 'react';
import SearchButton from './SeachButton';
import AppContainer from '../container/appContainer';
import { LocationContext } from '../_context/locationContext';
import { CircularProgress } from '@material-ui/core';

 
class Home extends React.Component {

    state = {
        map: false,
        position: {}
    }


    render() {


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