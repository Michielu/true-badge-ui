import React, { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { TbUploadImageProps, TbCropperProp } from '../../utils/interfaces';



const cropper = React.createRef();

function TbCropper(props: TbUploadImageProps & TbCropperProp) {
    const imageProps = props.badgeImage[0];
    const setImageProps = props.badgeImage[1];


    useEffect(() => {
        Object.assign(imageProps.image, {
            preview: URL.createObjectURL(imageProps.image)
        });
        setImageProps(prev => ({
            showCroppingModal: true,
            image: imageProps.image
        }));
    }, [imageProps.image])

    const toggleModal = function () {
        setImageProps(prev => ({
            showCroppingModal: !prev.showCroppingModal,
            image: null
        }));
    }

    const finishCropping = function () {
        console.log("Finish cropping");
        //Use onImageDrop
        setImageProps({
            showCroppingModal: false,
            image: null //TODO set to image
        })
    }

    const crop = () => {
        console.log("crop yo")
    }

    return (
        <>
            <Modal show={imageProps.showCroppingModal} onHide={() => { console.log("hide modal") }} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Image upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {console.log("pic: ", imageProps.image)}
                    <Cropper
                        ref={cropper}
                        src={imageProps.image.preview}
                        style={{ height: 400, width: '100%' }}
                        // Cropper.js options
                        aspectRatio={1 / 1}
                        guides={false}
                        crop={crop}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Close
                     </Button>
                    <Button variant="primary" onClick={finishCropping}>
                        Finish Cropping
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TbCropper;
