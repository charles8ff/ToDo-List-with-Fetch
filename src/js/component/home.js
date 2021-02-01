import React, { useState } from "react";
import PropTypes from "prop-types";
import Task from "./task.jsx";

// addTask = textTask => {
// 	receivedTask;
// 	taskList.push(receivedTask);
// };
export function Home() {
	const [textTask, setTextTask] = useState({ task: "" });
	const [taskList, setTaskList] = useState([]);

	const sendTextTask = e => {
		e.preventDefault();
		setTaskList([...taskList, textTask]);
		setTextTask({ task: "" });
		console.log(e);
	};

	let todoList = taskList.map((value, index) => (
		<Task inputValue={value.task} key={index} />
	));
	// console.log(todoList);
	return (
		<div className="App">
			<form className="form" onSubmit={sendTextTask}>
				<input
					type="text"
					value={textTask.task}
					placeholder="What needs to be done?"
					onChange={e => setTextTask({ task: e.target.value })}
				/>
			</form>
			<ul>{todoList}</ul>
		</div>
	);
}
