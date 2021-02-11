import React from 'react'
import ReactDOM from 'react-dom'

// Renders name of course
const Header = props => (
	<h1>{props.name}</h1>
);

// Renders the name and exercises of one part
const Part = props => (
	<p>
		{props.part.name} {props.part.exercises}
	</p>
);

// Renders the parts
const Content = props => {
	const part1 = props.parts[0];
	const part2 = props.parts[1];
	const part3 = props.parts[2];

	return (
		<>
			<Part part={part1} />
			<Part part={part2} />
			<Part part={part3} />
		</>
	);
};

// Renders total number of exercises
const Total = props => {
	const part1Exercises = props.parts[0].exercises;
	const part2Exercises = props.parts[1].exercises;
	const part3Exercises = props.parts[2].exercises;

	return (
		<p>
			Number of exercises {part1Exercises + part2Exercises + part3Exercises}
		</p>
	);
};

// Root component
const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
				exercises: 7
			},
			{
				name: 'State of a component',
				exercises: 14
			}
		]
	};

	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
}

// Render App component
ReactDOM.render(<App />, document.getElementById('root'))