import React, { useEffect, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { TbUploadImageProps, TbCropperProp } from '../../utils/interfaces';


function TbCropper(props: TbUploadImageProps & TbCropperProp) {
    const imageProps = props.badgeImage[0];
    const setImageProps = props.badgeImage[1];
    const cropperRef = useRef({
        cropper: null,
        getCroppedCanvas: () => {
            return {
                toDataURL: () => { },
                toBlob: (blob) => { }
            }
        }
    });


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

    const finishCropping = async function () {
        cropperRef.current.getCroppedCanvas().toBlob((imageBlob) => {
            setImageProps({
                showCroppingModal: false,
                image: imageBlob
            })
        })
    }

    const crop = () => {
        console.log("crop yo", cropperRef.current.getCroppedCanvas())
        console.log("crop yo2", cropperRef.current.getCroppedCanvas().toDataURL())
    }


    return (
        <>
            <Modal show={imageProps.showCroppingModal} onHide={toggleModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Image upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {console.log("pic: ", imageProps.image)}
                    <Cropper
                        ref={cropperRef}
                        src={imageProps.image.preview}
                        style={{ height: 400, width: '100%' }}
                        // Cropper.js options
                        aspectRatio={1 / 1}
                        guides={true}
                        // crop={crop}
                        rotatable={true}
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
