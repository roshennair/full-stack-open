import React from 'react';
import Country from './Country';

// Renders list of countries or one country's details
const Countries = ({ matchingCountries, setSelectedCountry }) => {
	if (matchingCountries.length > 10) {
		// Ask user to provide more specific filter
		return <p>Too many matches, specify another filter</p>;
	} else if (matchingCountries.length > 1) {
		// Display list of matching countries
		// If a button is clicked, its country is selected
		return (
			<div>
				{matchingCountries.map(country =>
					<li key={country.numericCode}>
						{country.name}
						<button onClick={() => setSelectedCountry(country)}>show</button>
					</li>
				)}
			</div>
		);
	} else if (matchingCountries.length === 1) {
		// Display details of one matching country
		return <Country country={matchingCountries[0]} />
	} else {
		// Ask user to enter a different input
		return <p>No matching countries, try another filter</p>
	}
}

export default Countries;