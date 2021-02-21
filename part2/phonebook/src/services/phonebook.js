import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

// Return a Promise that resolves to all persons list
const getAll = () => axios
	.get(baseUrl)
	.then(response => response.data);

// Post new person to DB, then return promise that resolves to new person object
const create = newPerson => axios
	.post(baseUrl, newPerson)
	.then(response => response.data);

// Delete person with given ID in DB, then return promise
const remove = id => axios.delete(`${baseUrl}/${id}`);

// Update a person's details in DB, then return a promise that resolves to that person's updated object
const update = (id, newPerson) => axios
	.put(`${baseUrl}/${id}`, newPerson)
	.then(response => response.data);

export default { getAll, create, remove, update };