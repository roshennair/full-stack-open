import React from 'react';

// Renders a single person
const Person = ({ name, number, deletePerson }) => (<p>
	{name} {number} <button onClick={deletePerson}>delete</button>
</p>);

export default Person;