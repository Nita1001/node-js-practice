import React, { useState } from 'react';
import axios from 'axios';

function WeatherForm() {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(`/weather/${location}`);
            const data = response.data;
            setWeatherData(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Location:
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </label>
                <button type="submit">Get Weather</button>
            </form>
            {weatherData && (
                <div>
                    <h2>Weather for {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Conditions: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

export default WeatherForm;