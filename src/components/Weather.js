import React, { useEffect, useState } from 'react';
import searchbox from '../img/search.png';
import clearIcon from '../img/clearsky.png';
import drizzleIcon from '../img/cloudy.png';
import rainIcon from '../img/raining.png';
import snowIcon from '../img/snow.png';
import humidity from '../img/humidity.png';
import wind from '../img/wind.png';
import '../css/Weather.css';

export const Weather = ({ temp, setTemp, city, setCity, country, setCountry, latitudeValue, setLatitudeValue, longitudeValue, setLongitudeValue, humidityValue, setHumidityValue, windValue, setWindValue }) => {
    const [searchItem, setSearchItem] = useState("Coimbatore");
    const [icon, setIcon] = useState(clearIcon);

    const weatherIconMap = {
        '01d': clearIcon,
        '01n': clearIcon,
        '02d': clearIcon,
        '02n': clearIcon,
        '03n': drizzleIcon,
        '03d': drizzleIcon,
        '04n': drizzleIcon,
        '04d': drizzleIcon,
        '09n': rainIcon,
        '09d': rainIcon,
        '10n': rainIcon,
        '10d': rainIcon,
        '13n': snowIcon,
        '13d': snowIcon
    };

    async function click() {
        try {
            const url = `http://localhost:5000/api/weather?city=${searchItem}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.message === 'City not found') {
                console.log("City not found");
                return;
            }

            setHumidityValue(data.humidityValue);
            setWindValue(data.windValue);
            setTemp(Math.floor(data.temp));
            setCity(data.city);
            setCountry(data.country);
            setLatitudeValue(data.latitudeValue);
            setLongitudeValue(data.longitudeValue);
            setIcon(weatherIconMap[data.weatherIcon] || clearIcon);
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    }

    function enter(e) {
        if (e.key === "Enter") {
            click();
        }
    }

    useEffect(() => {
        click();
    }, []);

    return (
        <main>
            <h1>WEATHER APP</h1>
            <div className='search'>
                <input type="text" placeholder='Enter City' onChange={(e) => setSearchItem(e.target.value)} value={searchItem} onKeyDown={enter} />
                <img src={searchbox} alt="search" onClick={click} />
            </div>
            <div className='weathercontent'>
                <img src={icon} alt="weather" />
                <h1>{temp}°C</h1>
                <h3>{city}</h3>
                <p>{country}</p>
            </div>
            <div className='subcontent'>
                <div className='lat'>
                    <h3>Latitude</h3>
                    <h3>{latitudeValue}</h3>
                </div>
                <div className='lon'>
                    <h3>Longitude</h3>
                    <h3>{longitudeValue}</h3>
                </div>
            </div>
            <div className='lastcontent'>
                <div className='humidity'>
                    <img src={humidity} alt="humidity" />
                    <h3>{humidityValue}%</h3>
                    <h3>Humidity</h3>
                </div>
                <div className='wind'>
                    <img src={wind} alt="wind" />
                    <h3>{windValue} km/hr</h3>
                    <h3>Wind</h3>
                </div>
            </div>
            <div className='copyrights'>
                <p>Designed by <span>Sadhana</span></p>
            </div>
        </main>
    );
}
