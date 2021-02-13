import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

// Root component
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	// Register effect hook to fetch persons data once, after initial render
	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => setPersons(response.data));
	}, []);

	// Update newName according to form input
	const handleNameChange = event => setNewName(event.target.value);

	// Update newNumber according to form input
	const handleNumberChange = event => setNewNumber(event.target.value);

	// Update searchTerm according to the search field
	const handleSearchChange = event => setSearchTerm(event.target.value);

	// Add new person to persons array
	const addNewPerson = event => {
		// Prevent page reload
		event.preventDefault();
		// Check if name already exists in persons array
		if (persons.some(person => person.name === newName)) {
			alert(`${newName} is already added to phonebook`);
		} else {
			// Create newPerson and update persons array
			const newPerson = {
				name: newName,
				number: newNumber
			};
			setPersons(persons.concat(newPerson));
			// Reset newName and newNumber variables
			setNewName('');
			setNewNumber('');
		}
	}

	// Tracks all persons to be currently displayed
	const personsToShow = searchTerm === ''
		? persons
		// Filters for persons whose names contain searchTerm
		: persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter onChange={handleSearchChange} />
			<h3>add a new</h3>
			<PersonForm
				onSubmit={addNewPerson}
				newName={newName}
				onNameChange={handleNameChange}
				newNumber={newNumber}
				onNumberChange={handleNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons persons={personsToShow} />
		</div>
	);
}

export default App;