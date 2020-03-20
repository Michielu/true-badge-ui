import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface TbCropperProps {
    onLoad: (pic: any) => void,

}

function TbCropper(props: TbCropperProps) {
    {/* 5242880 == 5.2 mb */ }
    {/* TODO center img center. If img is long horizontally, it only gets the beginning 
        - have the user select a square of it.. like if I change my profile pic on fb
    */}
    {/* 
        TODO 
        https://fengyuanchen.github.io/cropperjs/
        https://www.npmjs.com/package/cropperjs
        https://www.npmjs.com/package/react-cropper
    */}
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TbCropper;