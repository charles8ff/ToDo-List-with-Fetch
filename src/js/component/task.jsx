import React, { useState } from "react";
import PropTypes from "prop-types";

const Task = props => {
	const [myTask, setMyTask] = useState({
		text: "",
		isDone: false,
		id: -1
	});

	return <li>{props.inputValue}</li>;
};
Task.propTypes = {
	inputValue: PropTypes.string,
	isDone: PropTypes.bool,
	onMyClick: PropTypes.func
};
export default Task;
