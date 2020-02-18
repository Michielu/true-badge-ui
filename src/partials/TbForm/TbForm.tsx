import React from 'react';

import { Button } from 'react-bootstrap';

import Dropzone from 'react-dropzone'

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
    badgeName: string,
    badgeAudio: any,
    badgeImage: any,
};

interface ThumbProp {
    selectedFile: any
}

//TODO make this into function with hook
class TbForm extends React.Component<FormProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            badgeName: "",
            badgeImage: null,
            badgeAudio: null
        };
        this.onDrop = this.onDrop.bind(this);
        this.submitBadge = this.submitBadge.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    //TODO use tooltip for additional information

    //Name
    handleNameChange = (event) => {
        this.setState({ badgeName: event.target.value });
    }

    //Image
    onDrop = (pic) => {
        console.log("Pic: ", pic[0])
        Object.assign(pic[0], {
            preview: URL.createObjectURL(pic[0])
        })
        this.setState({
            badgeImage: pic,
        });
    }

    submitBadge = () => {
        console.log("Submit Badge!", this.state);
    }

    render() {
        return (
            <div className="row tb-center">
                <div>
                    <h3>Input Name</h3>
                    {/* TODO look into getting value without onChange. 
                        Maybe form, maybe different react package 
                        
                        Also, look up how to not rerender entire page with just one state change
                        Debug: Add console.log in Dropzone. Every text change rerenders it
                        */}
                    <input type="text" onChange={this.handleNameChange}></input>
                </div>
                {/* https://react-dropzone.js.org/ */}
                {/* TODO get styling going on this */}
                <div>
                    <h3>Upload Image</h3>
                    <Dropzone maxSize={5242880} multiple={false} accept='image/jpeg, image/png' onDrop={this.onDrop}>
                        {({ getRootProps, getInputProps, acceptedFiles }) => {
                            return (
                                <div className="container">
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <input {...getInputProps()} />
                                        <button type="button">Upload </button>
                                    </div>
                                    <aside>
                                        <aside style={thumbsContainer}>
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
                </div>
                <div>
                    <h3>Record name</h3>
                </div>
                <Button disabled={!(this.state.badgeImage && this.state.badgeName)} variant="primary" onClick={this.submitBadge}>Submit</Button>
            </div >
        )
    }
};
export default TbForm;