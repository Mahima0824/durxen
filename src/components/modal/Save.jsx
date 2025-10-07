import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Save = ({ show, handleClose, handleSave }) => {
    const [note, setNote] = useState('');

    const onSave = () => {
        handleSave(note);
        setNote('');
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Save Changes</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to save the changes?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="info" onClick={onSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Save;
