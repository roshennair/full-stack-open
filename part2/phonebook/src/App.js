import React, { useState, useEffect } from 'react';
import phonebook from './services/phonebook';
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
		phonebook
			.getAll()
			.then(initialPersons => setPersons(initialPersons));
	}, []);

	// Update newName according to form input
	const handleNameChange = event => setNewName(event.target.value);

	// Update newNumber according to form input
	const handleNumberChange = event => setNewNumber(event.target.value);

	// Update searchTerm according to the search field
	const handleSearchChange = event => setSearchTerm(event.target.value);

	// Update a person's number
	const updateNumber = () => {
		// Find person
		const oldPerson = persons.find(person => person.name === newName);
		// Create updated person object
		const updatedPerson = {
			...oldPerson,
			number: newNumber
		}
		// Make PUT request to DB
		phonebook
			.update(oldPerson.id, updatedPerson)
			.then(returnedPerson => {
				// Create new array containing updated person data
				setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person));
				setNewName('');
				setNewNumber('');
			})
	}

	// Add new person to persons array
	const addNewPerson = event => {
		// Prevent page reload
		event.preventDefault();
		// Check if name already exists in persons array
		if (persons.some(person => person.name === newName)) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				updateNumber()
			}
		} else {
			// Create newPerson and update persons array
			const newPerson = {
				name: newName,
				number: newNumber
			};
			phonebook
				.create(newPerson)
				.then(returnedPerson => {
					// Create new array containing new person
					setPersons(persons.concat(returnedPerson));
					// Reset newName and newNumber variables
					setNewName('');
					setNewNumber('');
				})
		}
	}

	// Delete a single person
	const deletePerson = personToDelete => {
		if (window.confirm(`Delete ${personToDelete.name}?`)) {
			// Delete person from DB
			phonebook
				.remove(personToDelete.id)
				.then(() => {
					// Update persons list
					setPersons(persons.filter(person => person.id !== personToDelete.id));
				});
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
			<Persons persons={personsToShow} deletePerson={deletePerson} />
		</div>
	);
}

export default App;