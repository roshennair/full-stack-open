import React from 'react';
import Person from './Person';

// Renders list of all persons
const Persons = ({ persons, deletePerson }) => (
	<div>
		{persons.map(person =>
			<Person key={person.id} name={person.name} number={person.number} deletePerson={() => deletePerson(person)} />
		)}
	</div>
);

export default Persons;