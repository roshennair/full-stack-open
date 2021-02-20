import React from 'react';

// Render weather details for a capital city
const Weather = ({ capital, weather }) => {
	if (!weather) return <></>
	return (
		<div>
			<h3>Weather in {capital}</h3>
			<p><strong>temperature:</strong> {weather.temperature} &#176;C</p>
			<img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} height="50" width="auto" />
			<p><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
		</div>
	)
}

export default Weather;