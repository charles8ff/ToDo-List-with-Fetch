import React, { useState } from "react";
import {
	Modal,
	ModalDialog,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button
} from "react-bootstrap";
import PropTypes from "prop-types";

const UserModal = props => {
    const [showModal, setShowModal] = useState(true);
    
	return (
		<Modal show={showModal}>
			<Modal.Header closeButton>
				<Modal.Title>Modal title</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={}>
					<input
						type="text"
						placeholder="what is your user?"
					/>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary">
					Look for the user (and create it if it does not exist)
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
UserModal.propTypes = {
	userInput: PropTypes.func
};
export default UserModal;
