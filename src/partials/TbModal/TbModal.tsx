import React, { useRef } from 'react';
import { Alert, Button, Modal } from "react-bootstrap";
import { ModalProps } from 'react-bootstrap/Modal';

interface TbModalProps {
    badgeUrl: string,
    copyUrlSuccessMessage: any[]

}

function TbModal(props: ModalProps & TbModalProps) {
    const copyUrlSuccessMessage = props.copyUrlSuccessMessage[0];
    const setCopyUrlSuccessMessage = props.copyUrlSuccessMessage[1];

    const textAreaRef = useRef(null);

    function copyToClipboard(e) {
        // @ts-ignore
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopyUrlSuccessMessage('Badge URL Copied!');
    };

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Badge created!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your badge was successfully created. Copy and paste this URL into any browser:</p>
                    <input className="tb-badge-url-input"
                        ref={textAreaRef}
                        value={props.badgeUrl}
                        readOnly
                    />
                    <br />
                    <br />
                    {copyUrlSuccessMessage ? <Alert variant="success">{copyUrlSuccessMessage}</Alert> : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
            </Button>
                    <Button variant="primary" onClick={copyToClipboard}>
                        Copy Badge URL
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TbModal;