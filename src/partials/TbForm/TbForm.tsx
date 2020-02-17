import React, { useEffect, useState } from 'react';

import { Button, Form } from 'react-bootstrap';

import Dropzone, { useDropzone } from 'react-dropzone'

// import { TbButton } from "../index";


const thumbsContainer = {
    display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    // boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

interface FormProps {
    // text: string
}
interface State {
    picture: any,
    uploadStatus: string
    selectedFile: any
};

interface ThumbProp {
    selectedFile: any
}

function Previews(props) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        maxSize: 5242880,
        multiple: false,
        onDrop: (acceptedFiles: any) => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map((file: any) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>
                {console.log("Hooked files: ", files)}

                {thumbs}
            </aside>
        </section>
    );
}

class TbForm extends React.Component<FormProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            picture: null,
            uploadStatus: "Upload Image",
            selectedFile: {}
        };
        this.onDrop = this.onDrop.bind(this);

    }

    //TODO use tooltip for additional information
    onDrop(pic) {
        console.log("Pic: ", pic[0])
        Object.assign(pic[0], {
            preview: URL.createObjectURL(pic[0])
        })
        this.setState({
            picture: pic,
            uploadStatus: "Image successfully uploaded"
        });
    }

    fileChangedHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] })

    }

    uploadHandler = () => {
        console.log(this.state.selectedFile)
    }


    render() {
        return (
            <div className="row tb-center">


                {/* https://react-dropzone.js.org/ */}
                {/* TODO get styling going on this */}


                <Dropzone maxSize={5242880} multiple={false} accept='image/jpeg, image/png' onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps, acceptedFiles }) => {
                        return (
                            <div className="container">
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here</p>
                                    <button
                                        type="button"
                                    // onClick={openDialog}
                                    >
                                        Open File Dialog
          </button>
                                </div>
                                <aside>
                                    <h4>Files</h4>
                                    {/* <ul>
                                        {acceptedFiles.map((file: any) => (
                                            <li key={file.path}>
                                                {file.path} - {file.size} bytes
              </li>
                                        ))}
                                    </ul> */}
                                    <aside style={thumbsContainer}>
                                        {console.log("Accepted files: ", acceptedFiles)}
                                        {/* {acceptedFiles.map(file => Object.assign(file, {
                                            preview: URL.createObjectURL(file)
                                        }))} */}
                                        {console.log("Selected Picture: ", this.state.picture)};
                                        {/* <Thumb selectedFile={acceptedFiles}></Thumb> */}
                                        {acceptedFiles.map((file: any) => (
                                            <div style={thumb} key={file.name}>
                                                <div style={thumbInner}>
                                                    <img
                                                        src={file.preview}
                                                        style={img}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </aside>
                                </aside>
                            </div>
                        );
                    }}
                </Dropzone>
                <Previews />
            </div>
        )
    }
};
export default TbForm;