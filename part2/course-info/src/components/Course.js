import React from 'react'

// Renders name of course
const Header = ({ name }) => (
	<h1>{name}</h1>
);

// Renders the name and exercises of one part
const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

// Renders the parts
const Content = ({ parts }) => (
	<>
		{parts.map(part => <Part key={part.id} part={part} />)}
	</>
);

// Renders total number of exercises
const Total = ({ parts }) => {
	// Get total number of exercises
	const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

	return (
		<p>
			<strong>total of {totalExercises} exercises</strong>
		</p>
	);
};

// Renders a single course
const Course = ({ course }) => (
	<div>
		<Header name={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
	</div>
);

export default Course;