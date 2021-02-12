import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Define buttons for submitting feedback
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

// Display a single statistic as a table row
const Statistic = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

// Display all statistics
const Statistics = ({ good, bad, neutral }) => {
	const total = good + bad + neutral;

	// If no feedback gathered, return this message
	if (total === 0) return <div>No feedback given</div>;

	// Helper functions
	const calculateAverageScore = () => (good - bad) / total
	const calculatePositivePercentage = () => (good / total) * 100;

	// Render statistics in a table
	return (
		<table>
			<tbody>
				<Statistic text="good" value={good} />
				<Statistic text="neutral" value={neutral} />
				<Statistic text="bad" value={bad} />
				<Statistic text="all" value={total} />
				<Statistic text="average" value={calculateAverageScore()} />
				<Statistic text="positive" value={calculatePositivePercentage() + '%'} />
			</tbody>
		</table>
	)
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	// Click event handlers
	const increaseGood = () => setGood(good + 1);
	const increaseNeutral = () => setNeutral(neutral + 1);
	const increaseBad = () => setBad(bad + 1);

	return (
		<div>
			<h2>give feedback</h2>
			<Button handleClick={increaseGood} text="good" />
			<Button handleClick={increaseNeutral} text="neutral" />
			<Button handleClick={increaseBad} text="bad" />
			<h2>statistics</h2>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

ReactDOM.render(<App />,
	document.getElementById('root')
)