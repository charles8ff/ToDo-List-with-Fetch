import React, { useState, useEffect } from "react";
import Task from "./task.jsx";
import { Card, Row, Container } from "react-bootstrap";

export function Home() {
	const [textTask, setTextTask] = useState({ task: "" });
	const [taskList, setTaskList] = useState([]);

	useEffect(() => {
		// POST request using fetch with error handling
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify([])
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/rafaela",
			requestOptions
		).then(response => {
			console.log(response.ok);
		});
	}, []);

	const sendTextTask = e => {
		e.preventDefault();
		setTaskList([...taskList, textTask]);
		setTextTask({ task: "" });
	};

	// const clickDelete = targetIndex => {
	// 	setTaskList(taskList.filter((_, index) => index !== targetIndex));
	// };

	let todoList = taskList.map((value, index) => (
		<Task
			inputValue={value.task}
			key={index}
			// onMyClick={() => clickDelete(index)}
		/>
	));
	return (
		<>
			<Container className="mt-5">
				<Row className="justify-content-md-center">
					<Card className="App todolist" style={{ width: "45rem" }}>
						<Card.Body>
							<Card.Title>ToDo List</Card.Title>
							<form
								className="form shadow-none"
								onSubmit={sendTextTask}>
								<input
									type="text"
									value={textTask.task}
									placeholder="What needs to be done?"
									onChange={e =>
										setTextTask({ task: e.target.value })
									}
								/>
							</form>
						</Card.Body>
						<ul className="list-group-flush">{todoList}</ul>
						<Card.Body>
							{taskList.length}
							<span> task(s) left</span>
						</Card.Body>
					</Card>
				</Row>
			</Container>
		</>
	);
}
