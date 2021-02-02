import React, { useState } from "react";
import PropTypes from "prop-types";
import ListGroupItem from "react-bootstrap";
const Task = props => {

	return (
		<li className="list-group-item">
			{props.inputValue}
			<i onClick={props.onMyClick} className="fas fa-trash-alt mr-4" />
		</li>
	);
};
Task.propTypes = {
	inputValue: PropTypes.string,
	isDone: PropTypes.bool,
	onMyClick: PropTypes.func
};
export default Task;
