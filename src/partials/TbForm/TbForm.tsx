import React from 'react';

import { Alert, Button, FormControl } from 'react-bootstrap';
import Dropzone from 'react-dropzone'
import { ReactMic } from 'react-mic';
import { FaMicrophoneAlt } from 'react-icons/fa';

import BadgeDataService from "../../api/badge/BadgeDataService";
import { ErrorMessageInterface } from "../../utils/interfaces";

import TbAlert from "../TbAlerts/TbAlerts";
import TbModal from "../TbModal/TbModal";

interface FormProps {
    // text: string
}


interface State {
    badgeName: string,
    badgeAudio: any,
    badgeImage: any,
    isRecording: boolean,
    audioError: boolean,
    hoveredIcon: boolean,
    hasError: boolean,
    errorMessages: ErrorMessageInterface,
    badgeUrl: string,
    displayModal: boolean
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
            hoveredIcon: false,
            hasError: false,
            errorMessages: { errorMessage: "", errorMessageLong: "" },
            badgeUrl: "",
            displayModal: false
        };
        this.onDrop = this.onDrop.bind(this);
        this.submitBadge = this.submitBadge.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.toggleRecord = this.toggleRecord.bind(this);
        this.onData = this.onData.bind(this);
        this.onStop = this.onStop.bind(this);
        this.playBlob = this.playBlob.bind(this);
        this.toggleIconCLass = this.toggleIconCLass.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
            badgeImage: pic[0],
        });
    }

    //Audio
    toggleRecord = () => {
        this.setState(prevState => ({
            isRecording: !prevState.isRecording
        }));
    }

    onData = (recordedBlob) => {
        // console.log('chunk of real-time data is: ', recordedBlob);
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

    submitBadge = async () => {
        const status = await BadgeDataService.create(this.state);
        console.log("Submit Badge!", status, this.state);

        // if (status.data.errorMessage) {
        //     this.setState({
        //         hasError: true,
        //         errorMessages: status.data
        //     })
        // } else {
        //     this.setState({
        //         hasError: false,
        //         badgeUrl: window.location.protocol + "//" + window.location.host + "/b/" + status.data.result.badgeURL, //TODO get localhost from elsewhere
        //         displayModal: true
        //     })
        // }
    }

    closeModal = () => {
        this.setState({
            displayModal: false
        })
    }
    playBlob = () => {
        const url = URL.createObjectURL(this.state.badgeAudio.blob);
        const tmp = new Audio(url);
        tmp.play();
    }

    toggleIconCLass = () => {
        this.setState((prevState) => ({
            hoveredIcon: !prevState.hoveredIcon
        }))
    }

    render() {
        return (
            <div className="row tb-center">
                <div id="tb-form" className="col-12 col-md-6 tb-center">
                    <div className="tb-form-field">
                        <TbAlert variant="danger" errorMessages={this.state.errorMessages} hasError={this.state.hasError}></TbAlert>
                        <TbModal show={this.state.displayModal} onHide={this.closeModal} badgeUrl={this.state.badgeUrl}></TbModal>
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
                    {/* TODO center img center. If img is long horizontally, it only gets the beginning 
                        - have the user select a square of it.. like if I change my profile pic on fb
                    */}
                    <div className="tb-form-field">
                        <h3>Upload Image<small>(optional)</small></h3>
                        {/* 5242880 == 5.2 mb */}
                        <Dropzone maxSize={5242880} multiple={false} accept='image/jpeg, image/png' onDrop={this.onDrop}>
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
                                                            alt="Preview of uploaded image"
                                                        />
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
                    {this.state.badgeAudio ? <Button variant="outline-info" onClick={this.playBlob} block>Play recording</Button> : null}

                    <Button disabled={!(this.state.badgeName && this.state.badgeAudio)} variant="primary" onClick={this.submitBadge} block>Submit</Button>
                    {this.state.badgeUrl ? <p>Badge URL is: {this.state.badgeUrl}</p> : null}
                </div >
            </div >

        )
    }
};
export default TbForm;