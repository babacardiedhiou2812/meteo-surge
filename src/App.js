import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [temp, setTemp] = useState("");
  const [name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Sunrise, setSunrise] = useState("");
  const [Sunset, setSunset] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [isReady, setReady] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?lat=12.783333&lon=-16.216667&exclude=hourly&appid=0d6816750806389bf094fa6b0b9fd7e7'
    )
      .then(result => result.json())
      .then(jsonresult => {
        setTemp(jsonresult.main.temp);
        setDescription(jsonresult.weather[0].description);
        setSunrise(jsonresult.sys.sunrise);
        setSunset(jsonresult.sys.sunset);
        setName(jsonresult.name);
        setDesc(jsonresult.weather[0].main);
        setIcon(jsonresult.weather[0].icon);
        setReady(true);
      })
      .catch(err => console.error(err));
  }, []);

  const tempClass = temp > 300 ? "bg-red" : "bg-blue";

  const handleSearch = () => {
    // Fetch weather data based on entered latitude and longitude
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly&appid=0d6816750806389bf094fa6b0b9fd7e7`
    )
      .then(result => result.json())
      .then(jsonresult => {
        setTemp(jsonresult.main.temp);
        setDescription(jsonresult.weather[0].description);
        setSunrise(jsonresult.sys.sunrise);
        setSunset(jsonresult.sys.sunset);
        setName(jsonresult.name);
        setDesc(jsonresult.weather[0].main);
        setIcon(jsonresult.weather[0].icon);
        setReady(true);
      })
      .catch(err => console.error(err));
  };

  if (isReady) {
    return (
      <div className="container">
        {/* Colonne de gauche (Informations météo) */}
        <div className={`weather-info ${tempClass}`}>
          <h1 className="text-3xl font-bold mb-6">My Weather APP</h1>
          <p>City: {name}</p>
          <p>Temperature: {temp} °C</p>
          <p>Main: {desc}</p>
          <p>Description: {Description}</p>
          <p>
            Illustration:{" "}
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" />
          </p>
          <p>Sunrise: {Sunrise}</p>
          <p>Sunset: {Sunset}</p>
        </div>

        {/* Colonne de droite (Latitude/Longitude) */}
        <div className="lat-long-info">
          <h2 className="text-xl font-bold mb-4">votre latitude et votre longitude</h2>
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default App;
