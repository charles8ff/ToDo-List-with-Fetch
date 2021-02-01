import React, { useState } from "react";
import PropTypes from "prop-types";
import Task from "./task.jsx";

let taskList = [];

// addTask = textTask => {
// 	receivedTask;
// 	taskList.push(receivedTask);
// };
export function Home() {
	const [textTask, setTextTask] = useState("");
	const [arr, setArr] = useState([
		{
			task: ""
		}
	]);
	const sendTextTask = e => {
		e.preventDefault();
		taskList.push(textTask);
		console.log(taskList);
	};
	let todoList = taskList.map((index, key) => (
		<Task inputValue={index} key={key} />
	));
	// console.log(todoList);
	return (
		<div className="App">
			<form className="form" onSubmit={sendTextTask}>
				<input
					type="text"
					value={textTask}
					onChange={e => setTextTask(e.target.value)}
				/>
				{todoList}
			</form>
		</div>
	);
}
