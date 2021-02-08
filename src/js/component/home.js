import React, { useState, useEffect } from "react";
import Task from "./task.jsx";
import { Card, Row, Container, Modal, Button } from "react-bootstrap";

export function Home() {
	const [task, setTask] = useState({ label: "", done: false });
	const [taskList, setTaskList] = useState([]);
	const [user, setUser] = useState("");
	const [showModal, setShowModal] = useState(true);

	useEffect(
		() => {
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
		},
		[showModal]
	);

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
		setTaskList(taskList => [...taskList, task]); //in our website
	};

	useEffect(
		//this triggers after sendTask(), because it changes the variable taskLIst
		() => {
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

	const clickDeleteTask = targetIndex => {
		setTaskList(taskList.filter((_, index) => index !== targetIndex)); //in our website
		fetch("https://assets.breatheco.de/apis/fake/todos/user/" + user, {
			//in the API
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

	const clickDeleteUser = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/" + user, {
			//in the API
			method: "DELETE"
		})
			.then(res => res.json())
			.then(response => console.log("Success:", JSON.stringify(response)))
			.catch(error => console.error("Error:", error));

		setUser("");
		setShowModal(true);
	};

	const clickDoneTask = targetIndex => {
		taskList[targetIndex].done = !taskList[targetIndex].done;
		//this does not update the li's
	};
	let todoList = taskList.map((value, index) => (
		<Task
			inputValue={value.label}
			key={index}
			isDone={value.done}
			onMyClickDone={() => clickDoneTask(index)}
			onMyClickDelete={() => clickDeleteTask(index)}
		/>
	));

	return (
		<>
			<Modal show={showModal}>
				<form>
					{/* the closeButton has to close*/}
					<Modal.Header>
						<Modal.Title>User Search</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<input
							placeholder="Type your user"
							type="text"
							className="inputSize"
							value={user}
							onChange={e => {
								setUser(e.target.value);
							}}
						/>
					</Modal.Body>
					<Modal.Footer>
						{/* format & align right*/}
						<Button
							variant="dark"
							onClick={() => setShowModal(false)}>
							Look for the user (and create it if it does not
							exist)
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
			<Container className="mt-5">
				<Row className="justify-content-md-center">
					<Card className="App todolist" style={{ width: "45rem" }}>
						<Card.Body>
							<Card.Title>THINGS TO DO LIST</Card.Title>
							<form
								className="form shadow-none"
								onSubmit={sendTask}>
								<input
									type="text"
									value={task.label}
									className="inputSize"
									placeholder="What needs to be done?"
									onChange={e =>
										setTask({
											label: e.target.value,
											done: false
										})
									}
								/>
							</form>
							<Row className="d-flex flex-row justify-content-center mt-3">
								<Button onClick={clickDeleteUser}>
									Search user
								</Button>
							</Row>
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
