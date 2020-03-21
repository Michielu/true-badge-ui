
import React, { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';


interface TbUploadImageProps {
    badgeImage: any[]
}

interface TbCropImageModalProp {
    onImageDrop: (pic: any) => void
}


const cropper = React.createRef();

function CropImageModal(props: TbUploadImageProps & TbCropImageModalProp) {
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

function TbUploadImage(props: TbUploadImageProps) {
    const imageProps = props.badgeImage[0];
    const setImageProps = props.badgeImage[1];


    const openModal = function (img) {
        setImageProps({
            showCroppingModal: true,
            image: img[0]
        })
    }

    const onImageDrop = (pic) => {
        Object.assign(pic[0], {
            preview: URL.createObjectURL(pic[0])
        });
        setImageProps({
            showCroppingModal: false,
            image: pic
        });
    };

    {/* 5242880 == 5.2 mb */ }
    {/* TODO center img center. If img is long horizontally, it only gets the beginning 
        - have the user select a square of it.. like if I change my profile pic on fb
    */}
    {/* 
        TODO 
        https://fengyuanchen.github.io/cropperjs/
        https://www.npmjs.com/package/cropperjs
    */}
    if (imageProps.showCroppingModal) {
        const cropProp = {
            ...props,
            onImageDrop: onImageDrop
        }
        return CropImageModal(cropProp);
    }

    return (
        <Dropzone maxSize={5242880} multiple={false} accept='image/jpeg, image/png' onDrop={openModal}>
            {({ getRootProps, getInputProps, acceptedFiles }) => {
                return (
                    <div className="container">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <Button variant="outline-primary" size="lg">Upload</Button>
                        </div>
                        <aside className="tb-center tb-preview-container">
                            {acceptedFiles.map((file: any, i: number) => (
                                <div key={"img" + i}>
                                    <div>
                                        <small>Preview</small>
                                    </div>
                                    <div className="tb-preview" key={file.name}>
                                        <img
                                            src={file.preview}
                                            className="tb-preview-img"
                                            alt="Preview"
                                        />
                                    </div>
                                </div>
                            ))}
                        </aside>
                    </div>
                );
            }}
        </Dropzone>
    );
}

export default TbUploadImage;