import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Countries from './components/Countries';
import axios from 'axios';

const App = () => {
	// State variables
	const [searchQuery, setSearchQuery] = useState('');
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);

	// Event handlers
	const handleSearchChange = event => {
		setSearchQuery(event.target.value);
		setSelectedCountry(null);
	}

	// Fetch countries JSON data on initial render
	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => setCountries(response.data));
	}, []);

	// Filter countries if no country is selected, otherwise create list containing only selected country
	const matchingCountries = !selectedCountry
		? countries.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
		: [selectedCountry]

	return (
		<div>
			<Search onChange={handleSearchChange} />
			{
				// Print message if no search query given, otherwise display matching countries
				searchQuery === ''
					? <p>Enter a query to search for countries</p>
					: <Countries matchingCountries={matchingCountries} setSelectedCountry={setSelectedCountry} />
			}
		</div>
	)
}

export default App;