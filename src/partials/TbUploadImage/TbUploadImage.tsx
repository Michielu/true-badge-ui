
import React, { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
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
        return TbCropper(cropProp);
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