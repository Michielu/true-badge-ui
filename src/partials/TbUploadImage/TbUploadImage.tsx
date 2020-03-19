
import React from 'react';
import { Button } from "react-bootstrap";
import Dropzone from 'react-dropzone'

interface TbUploadImageProps {
    onDrop: (pic: any) => void
}

function TbUploadImage(props: TbUploadImageProps) {
    return (
        <Dropzone maxSize={5242880} multiple={false} accept='image/jpeg, image/png' onDrop={props.onDrop}>
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