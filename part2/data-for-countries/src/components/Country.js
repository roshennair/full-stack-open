import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';

// Render the details of a single country
const Country = ({ country }) => {
	// State variable
	const [weather, setWeather] = useState(null);

	// Get API key and fetch weather data
	const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY;
	useEffect(() => {
		axios
			.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`)
			.then(response => setWeather(response.data.current));
	}, []);

	return (
		<div>
			<h2>{country.name}</h2>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>
			<h3>Spoken languages:</h3>
			<ul>
				{country.languages.map(language =>
					<li key={language.iso639_1}>
						{language.name}
					</li>
				)}
			</ul>
			<img src={country.flag} alt={country.name + ' flag'} height="100" width="auto" />
			<Weather capital={country.capital} weather={weather} />
		</div>
	)
};

export default Country;