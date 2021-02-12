import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Renders a button
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = ({ anecdotes }) => {
	const [selected, setSelected] = useState(0);
	// votes - Array of number of votes for each anecdote
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
	// maxVoteIndex - Index of anecdote with highest number of votes
	const [maxVoteIndex, setMaxVoteIndex] = useState(0);

	// Increments the num of votes for a single anecdote
	const vote = () => {
		// Create a copy of votes array and increment this anecdote's votes
		const newVotes = [...votes];
		newVotes[selected] += 1
		setVotes(newVotes);
		// If this anecdote's votes are higher than max, set new max vote index
		if (newVotes[selected] > newVotes[maxVoteIndex]) setMaxVoteIndex(selected);
	}

	// Sets selected to a random index from the anecdotes array
	const nextAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length));

	return (
		<div>
			<h2>Anecdote of the day</h2>
			<p>{anecdotes[selected]}</p>
			<p>has {votes[selected]} votes</p>
			<Button handleClick={vote} text="vote" />
			<Button handleClick={nextAnecdote} text="next anecdote" />
			<h2>Anecdote with most votes</h2>
			<p>{anecdotes[maxVoteIndex]}</p>
			<p>has {votes[maxVoteIndex]} votes</p>
		</div>
	);
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
	<App anecdotes={anecdotes} />,
	document.getElementById('root')
);