import React from 'react';

import { Button } from "react-bootstrap";
import Dropzone from 'react-dropzone'
import 'cropperjs/dist/cropper.css';

import TbCropper from '../TbCropper/TbCropper';
import { TbUploadImageProps } from '../../utils/interfaces';

function TbUploadImage(props: TbUploadImageProps) {
    const imageProps = props.badgeImage[0];
    const setImageProps = props.badgeImage[1];


    const openModal = function (img) {
        setImageProps({
            showCroppingModal: true,
            image: img[0],
            type: img[0].type
        })
    }

    const onImageDrop = (pic) => {
        Object.assign(pic[0], {
            preview: URL.createObjectURL(pic[0])
        });
        setImageProps(prev => ({
            showCroppingModal: false,
            image: pic,
            type: prev.type
        }));
    };

    /* 5242880 == 5.2 mb */
    if (imageProps.showCroppingModal) {
        const cropProp = {
            ...props,
            onImageDrop: onImageDrop
        }
        return TbCropper(cropProp);
    }

    return (
        <Dropzone maxSize={5242880} multiple={false} accept='image/jpeg, image/png' onDrop={openModal}>
            {({ getRootProps, getInputProps }) => {
                let preview = "";
                if (imageProps.image) {
                    preview = URL.createObjectURL(imageProps.image);
                }

                return (
                    <div className="container">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <Button variant="outline-primary" size="lg">Upload</Button>
                        </div>
                        {imageProps.image &&
                            <aside className="tb-center tb-preview-container">
                                <div >
                                    <div>
                                        <small>Preview</small>
                                    </div>
                                    <div className="tb-preview" >
                                        <img
                                            src={preview}
                                            className="tb-height-100"
                                            alt="Preview"
                                        />
                                    </div>
                                </div>
                            </aside>
                        }
                    </div>
                );
            }}
        </Dropzone>
    );
}

export default TbUploadImage;