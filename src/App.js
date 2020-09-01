import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from './components/Header'
import DisplayWeatherData from './components/DisplayWeatherData'


function App() {
  const [location, setLocation] = useState({
    latitude: 45,
    longitude: 45,
  });
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(newLocation);
        getWeatherData(newLocation.latitude, newLocation.longitude,'');
      });
    } else {
      console.log(
        "Si no me das permiso, no puedo obtener la localizacion de tu city"
      );
      getWeatherData(location.latitude, location.longitude,'');
    }
  }, []);



  const getWeatherData = async (latitude, longitude,city) => {
    try {
      const res = await axios.get(
        "http://api.weatherstack.com/current?access_key=80ef79e5c98d1a5741b2d8bce09968a6&query=" +
          city+
          latitude +
          "," +
          longitude
      );
      const data = res.data;
      console.log(res)
    setWeatherData({
        temperature: data.current.temperature ,
        description: data.current.weather_descriptions[0],
        location: data.location.name,
        region: data.location.region,
        country: data.location.country,
        wind_speed: data.current.wind_speed,
        pressure: data.current.pressure,
        precip: data.current.precip,
        humidity: data.current.humidity,
        img: data.current.weather_icons,
      });
      
    } catch (error) {
        console.log('no se pudo')
    }
    
    

  };

  return(
    
      <div className="container ">
        <Header getWeatherData={getWeatherData}/>
        <DisplayWeatherData {...weatherData} />
      </div>
    
  );
}

export default App;
