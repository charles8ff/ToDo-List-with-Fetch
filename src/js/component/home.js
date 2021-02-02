import React, { useState, useEffect } from "react";
import Task from "./task.jsx";
import { Card, Row, Container, Modal, Button } from "react-bootstrap";

export function Home() {
	const [task, setTask] = useState({ label: "", done: false });
	const [taskList, setTaskList] = useState([]);
	const [user, setUser] = useState("");
	const [showModal, setShowModal] = useState(true);

	useEffect(() => {
		const requestOptions = {
			method: "GET"
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/" + user,
			requestOptions
		)
			.then(response => {
				if (!response.ok) {
					console.log("he lanzado el error");
					throw user;
				}
				console.log("no error, we proceed");
				return response.json();
			})
			.then(responseAsJson => {
				setTaskList(responseAsJson);
			})
			.catch(user => {
				createUser(user);
			});
	}, []);

	const createUser = user => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify([])
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/" + user,
			requestOptions
		).then(response => console.log(response));
	};

	const sendTask = e => {
		e.preventDefault();
		setTaskList(taskList => [...taskList, task]);
		console.log(task);
	};

	useEffect(
		() => {
			console.log("ha cambiado");
			console.log(taskList);
			fetch("https://assets.breatheco.de/apis/fake/todos/user/" + user, {
				method: "PUT",
				body: JSON.stringify(taskList),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(res => res.json())
				.then(response =>
					console.log("Success:", JSON.stringify(response))
				)
				.catch(error => console.error("Error:", error));
			setTask({ label: "", done: false });
		},
		[taskList]
	);

	const clickDelete = targetIndex => {
		setTaskList(taskList.filter((_, index) => index !== targetIndex));
		fetch("https://assets.breatheco.de/apis/fake/todos/user/" + user, {
			method: "PUT",
			body: JSON.stringify(taskList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => console.log("Success:", JSON.stringify(response)))
			.catch(error => console.error("Error:", error));
	};

	let todoList = taskList.map((value, index) => (
		<Task
			inputValue={value.label}
			key={index}
			onMyClick={() => clickDelete(index)}
		/>
	));

	const handleUserKeyPress = e => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			console.log(e.target.value);
			//handleSubmit(onSubmit); // this won't be triggered
		}
	};
	return (
		<>
			<Modal show={showModal}>
				<Modal.Header closeButton>
					<Modal.Title>Modal title</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<input
							value={user}
							onKeyPress={() => handleUserKeyPress()} //does not let to type
							type="text"
						/>
						{/* <input
							type="text"
							placeholder="Write your message here..."
							onKeyPress={handleUserKeyPress}
						/> */}
						{/* <input
							type="text"
							className="modalInput"
							placeholder="what is your user?"
						/> */}
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => setShowModal(false)}>
						Look for the user (and create it if it does not exist)
					</Button>
				</Modal.Footer>
			</Modal>
			<Container className="mt-5">
				<Row className="justify-content-md-center">
					<Card className="App todolist" style={{ width: "45rem" }}>
						<Card.Body>
							<Card.Title>ToDo List</Card.Title>
							<Button>Delete this user and all his tasks</Button>
							<form
								className="form shadow-none"
								onSubmit={sendTask}>
								<input
									type="text"
									value={task.label}
									placeholder="What needs to be done?"
									onChange={e =>
										setTask({
											label: e.target.value,
											done: false
										})
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
