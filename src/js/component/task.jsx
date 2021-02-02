import React, { useState } from "react";
import PropTypes from "prop-types";
import ListGroupItem from "react-bootstrap";
const Task = props => {
	const checkDone = bool => {
		return bool ? "isStriked" : "";
	};
	return (
		<li
			className={`list-group-item ${checkDone(() => {
				props.isDone;
			})}`}>
			{props.inputValue}
			<i
				onClick={props.onMyClickDone}
				className="fa fa-check"
				aria-hidden="true"
			/>
			<i
				onClick={props.onMyClickDelete}
				className="fas fa-trash-alt mr-4"
			/>
		</li>
	);
};
Task.propTypes = {
	inputValue: PropTypes.string,
	isDone: PropTypes.bool,
	onMyClickDelete: PropTypes.func,
	onMyClickDone: PropTypes.func,
	doneCheck: PropTypes.string
};
export default Task;
