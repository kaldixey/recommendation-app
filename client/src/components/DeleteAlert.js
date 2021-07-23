import React from 'react';
import {Modal} from 'react-bootstrap';


function DeleteAlert(props) {
let setShow = props.showDeleteAlert;

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

return (
    <Modal
        show={setShow}
        onHide={handleClose}
        backdrop="static"
    >
        <Modal.Title>Are you sure you want to delete?</Modal.Title>
    </Modal>
)

}


export default DeleteAlert;