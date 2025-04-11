import { useState } from 'react';
import './App.css';
import { Weather } from './components/Weather';

function App() {

  var [temp,setTemp]=useState(0)
  var [city,setCity]=useState("Coimbatore")
  var [country,setCountry]=useState("IN")
  var [latitudeValue,setLatitudeValue]=useState(0)
  var [longitudeValue,setLongitudeValue]=useState(0)
  var [humidityValue,setHumidityValue]=useState(0)
  var [windValue,setWindValue]=useState(0)

  return (
    <>
    <Weather temp={temp}
    setTemp={setTemp}
    city={city}
    setCity={setCity}
    country={country}
    setCountry={setCountry}
    latitudeValue={latitudeValue}
    setLatitudeValue={setLatitudeValue}
    longitudeValue={longitudeValue}
    setLongitudeValue={setLongitudeValue}
    humidityValue={humidityValue}
    setHumidityValue={setHumidityValue}
    windValue={windValue}
    setWindValue={setWindValue}/>
    </>
  );
}

export default App;
