import React from 'react';

import { Alert, Button, FormControl } from 'react-bootstrap';
import Dropzone from 'react-dropzone'
import { ReactMic } from 'react-mic';
import { FaMicrophoneAlt } from 'react-icons/fa';



const thumbsContainer = {
    // display: 'flex',
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
    isRecording: boolean,
    audioError: boolean,
    hoveredIcon: boolean
};

//TODO make this into function with hook
class TbForm extends React.Component<FormProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            badgeName: "",
            badgeImage: null,
            badgeAudio: null,
            isRecording: false,
            audioError: false,
            hoveredIcon: false
        };
        this.onDrop = this.onDrop.bind(this);
        this.submitBadge = this.submitBadge.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.toggleRecord = this.toggleRecord.bind(this);
        this.onData = this.onData.bind(this);
        this.onStop = this.onStop.bind(this);
        this.playBlob = this.playBlob.bind(this);
        this.toggleIconCLass = this.toggleIconCLass.bind(this);
    }
    //TODO use tooltip for additional information

    //Name
    handleNameChange = (event) => {
        this.setState({ badgeName: event.target.value });
    }

    //Image
    onDrop = (pic) => {
        Object.assign(pic[0], {
            preview: URL.createObjectURL(pic[0])
        })
        this.setState({
            badgeImage: pic,
        });
    }

    //Audio
    toggleRecord = () => {
        this.setState(prevState => ({
            isRecording: !prevState.isRecording
        }));
    }

    onData = (recordedBlob) => {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);

        //TODO check what the limit I set on the server is and update this
        if (recordedBlob.stopTime - recordedBlob.startTime > 5000) {
            this.setState({
                audioError: true
            })
        } else {
            this.setState({
                badgeAudio: recordedBlob,
                audioError: false
            })
        }
    }

    submitBadge = () => {
        console.log("Submit Badge!", this.state);
    }

    playBlob = () => {
        const url = URL.createObjectURL(this.state.badgeAudio.blob);
        const tmp = new Audio(url);
        tmp.play();
    }

    toggleIconCLass = () => {
        window.console.log("In icon")
        this.setState((prevState) => ({
            hoveredIcon: !prevState.hoveredIcon
        }))
    }

    render() {
        return (
            <div className="row tb-center">
                <div id="tb-form" className="col-12 col-md-6 tb-center">
                    <div className="tb-form-field">
                        <h3>Input Name</h3>
                        {/* TODO look into getting value without onChange. 
                        Maybe form, maybe different react package 
                        
                        Also, look up how to not rerender entire page with just one state change
                        Debug: Add console.log in Dropzone. Every text change rerenders it
                        */}
                        <FormControl
                            placeholder="Your name"
                            aria-label="Your name"
                            aria-describedby="basic-addon2"
                            onChange={this.handleNameChange}
                        />
                    </div>
                    {/* https://react-dropzone.js.org/ */}
                    {/* TODO get styling going on this */}
                    <div className="tb-form-field">
                        <h3>Upload Image</h3>
                        <Dropzone maxSize={5242880} multiple={false} accept='image/jpeg, image/png' onDrop={this.onDrop}>
                            {({ getRootProps, getInputProps, acceptedFiles }) => {
                                return (
                                    <div className="container">
                                        <div {...getRootProps({ className: 'dropzone' })}>
                                            <input {...getInputProps()} />
                                            <Button variant="outline-primary" size="lg">Upload</Button>
                                        </div>
                                        <aside style={thumbsContainer} className="tb-center">
                                            {acceptedFiles.map((file: any) => (
                                                <div>
                                                    <div>
                                                        <small>Preview</small>
                                                    </div>
                                                    <div style={thumb} key={file.name}>
                                                        <div style={thumbInner}>
                                                            <img
                                                                src={file.preview}
                                                                style={img}
                                                                alt="Preview of uploaded image"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            ))}
                                        </aside>
                                    </div>
                                );
                            }}
                        </Dropzone>
                    </div>
                    <div className="tb-form-field">
                        <h3>Record name</h3>
                        {/* TODOs
                    - Styling
                    - Time limit
                    - Counter
                    - Size limit
                    - Red dot symolizing recording
                    - change audioError to audioErrorCode
                    - Fix onhover/onClick mic styling on mobile
                    */}
                        <div onClick={this.toggleRecord}>
                            <ReactMic
                                record={this.state.isRecording}
                                className="sound-wave"
                                onStop={this.onStop}
                                onData={this.onData}
                                strokeColor="#098fe0"
                                backgroundColor="#e6e7e8"
                            />
                        </div>
                        <div onMouseEnter={this.toggleIconCLass} onMouseLeave={this.toggleIconCLass} className={this.state.hoveredIcon ? 'tb-icon-hover tb-center' : 'tb-icon tb-center'}>
                            <FaMicrophoneAlt size={52} onClick={this.toggleRecord} />
                        </div>
                        <div>
                            {this.state.isRecording ? <p>Recording in progress</p> : null}
                        </div>
                    </div>
                    <Alert show={this.state.audioError} variant="danger">Audio is too long</Alert>
                    {this.state.badgeAudio ? <Button variant="outline-secondary" onClick={this.playBlob} block>Play recording</Button> : null}

                    <Button disabled={!(this.state.badgeImage && this.state.badgeName && this.state.badgeAudio)} variant="primary" onClick={this.submitBadge} block>Submit</Button>
                </div >
            </div >

        )
    }
};
export default TbForm;