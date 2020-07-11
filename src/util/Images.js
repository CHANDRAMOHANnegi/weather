
import React, { useEffect, useState } from 'react'
import dimage from '../assets/sun.png'

const Icons = (props) => {


    const [image, setImage] = useState(dimage);

    useEffect(() => {
        const rangeId = props.id;
        const path = props.path;
        console.log(rangeId);

        switch (rangeId) {
            case rangeId >= 200 && rangeId < 232:
                setImage(path + 'thunderstorm.png');
                break;
            case rangeId >= 300 && rangeId <= 321:
                setImage(path + 'rain.png');
                break;
            case rangeId >= 500 && rangeId <= 521:
                setImage(path + 'rain2.png');
                break;
            case rangeId >= 600 && rangeId <= 622:
                setImage(path + 'snow.png');
                break;
            case rangeId & rangeId <= 781:
                setImage(path + 'haze.png');
                break;
            case rangeId === 800:
                setImage(path + 'sun.png');
                break;
            case rangeId >= 801 && rangeId <= 804:
                setImage(path + 'storm.png');
                break;
            default:
                setImage(path + 'sun.png');
        }

    }, [props]);


    return (
        <img className='profile-image' alt='icon' src={(image)} />
    );
}

export default Icons;

