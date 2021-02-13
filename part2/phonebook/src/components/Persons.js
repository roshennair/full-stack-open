import React from 'react';
import Person from './Person';

// Renders list of all persons
const Persons = ({ persons }) => (
	<div>
		{persons.map(person =>
			<Person key={person.name} name={person.name} number={person.number} />
		)}
	</div>
);

export default Persons;