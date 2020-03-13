import React, { useState } from 'react';
import { Modal, Spinner } from "react-bootstrap";
import { ModalProps } from 'react-bootstrap/Modal';

interface TbLoaderProps {
    message: string,
}

function TbLoader(props: ModalProps & TbLoaderProps) {
    const [copySuccess, setCopySuccess] = useState('');

    return (
        <Modal show={props.show} onHide={props.onHide} backdrop="static">
            <Modal.Header>
                <Modal.Title>{props.message} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Modal.Body>
        </Modal>
    );
}

export default TbLoader;