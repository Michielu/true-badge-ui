import React, { useState, useEffect } from 'react';

import { Alert, Button, FormControl } from 'react-bootstrap';
import { ReactMic } from 'react-mic';
import { FaMicrophoneAlt } from 'react-icons/fa';

import BadgeDataService from "../../api/badge/BadgeDataService";
import { ErrorMessageInterface } from "../../utils/interfaces";

import TbAlert from "../TbAlerts/TbAlerts";
import TbModal from "../TbModal/TbModal";
import TbSpinner from "../TbLoader/TbLoader";
import TbUploadImage from "../TbUploadImage/TbUploadImage";

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
    displayModal: boolean,
    displaySpinner: boolean
};

function TbForm() {

    const [badgeName, setBadgeName] = useState("");
    const [badgeImage, setBadgeImage] = useState(null);
    const [badgeAudio, setBadgeAudio] = useState({
        audio: { blob: null },
        audioError: false
    });

    const [createBadge, setCreateBadge] = useState({
        error: false, //used to be hasError
        errorMessages: { errorMessage: "", errorMessageLong: "" },
        displaySpinner: false
    }); //What error?

    const [recording, setRecording] = useState(false);
    const [hoveredIcon, setHoveredIcon] = useState(false);
    const [badgeModal, setBadgeModal] = useState({
        url: "",
        displayModal: false
    });


    //TODO use tooltip for additional information

    //Name
    const handleNameChange = (event) => {
        setBadgeName(event.target.value)
    };

    //Image
    const onDrop = (pic) => {
        Object.assign(pic[0], {
            preview: URL.createObjectURL(pic[0])
        });
        setBadgeImage(pic);
    };

    //Audio
    const toggleAudioRecord = () => {
        setRecording(prevRecording => !prevRecording);
    };

    const onData = (recordedBlob) => {
        // console.log('chunk of real-time data is: ', recordedBlob);
    }

    const stopRecording = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);

        //TODO check what the limit I set on the server is and update this
        if (recordedBlob.stopTime - recordedBlob.startTime > 5000) {
            setBadgeAudio({
                audio: { blob: null },
                audioError: true
            });
        } else {
            setBadgeAudio({
                audio: recordedBlob,
                audioError: false
            });
        }
    }

    const submitBadge = async () => {
        setCreateBadge({
            error: false,
            errorMessages: { errorMessage: "", errorMessageLong: "" },
            displaySpinner: true
        });

        const status = await BadgeDataService.create({
            badgeAudio: badgeAudio.audio,
            badgeImage,
            badgeName
        });
        console.log("Submit Badge!", status, {
            badgeAudio: badgeAudio.audio,
            badgeImage,
            badgeName
        });

        if (status.data.errorMessage) {
            setCreateBadge({
                error: true,
                errorMessages: status.data,
                displaySpinner: false
            });
        } else {
            setCreateBadge({
                error: false,
                errorMessages: { errorMessage: "", errorMessageLong: "" },
                displaySpinner: false
            });
            setBadgeModal({
                url: window.location.protocol + "//" + window.location.host + "/b/" + status.data.result.badgeURL, //TODO get localhost from elsewhere
                displayModal: true
            })
        }
    }

    const closeBadgeURLModal = () => {
        setBadgeModal({
            url: window.location.protocol + "//" + window.location.host + "/b/" + status.data.result.badgeURL, //TODO get localhost from elsewhere
            displayModal: false
        })
    }

    const playBlob = () => {
        const url = URL.createObjectURL(badgeAudio.audio.blob);
        const tmp = new Audio(url);
        tmp.play();
    }

    const toggleIconCLass = () => {
        setHoveredIcon(prevState => !prevState)
    };

    return (
        <div className="row tb-center">
            <div id="tb-form" className="col-12 col-md-6 tb-center">
                <div className="tb-form-field">
                    <TbAlert variant="danger" errorMessages={createBadge.errorMessages} hasError={createBadge.error}></TbAlert>
                    <TbModal show={badgeModal.displayModal} onHide={closeBadgeURLModal} badgeUrl={badgeModal.url}></TbModal>
                    <TbSpinner show={createBadge.displaySpinner} message="Please wait.. generating badge URL" />
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
                        onChange={handleNameChange}
                    />
                </div>

                <div className="tb-form-field">
                    <h3>Upload Image<small>(optional)</small></h3>
                    <TbUploadImage onDrop={onDrop}></TbUploadImage>
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
                    <div onClick={toggleRecord}>
                        <ReactMic
                            record={isRecording}
                            className="sound-wave"
                            stopRecording={stopRecording}
                            onData={onData}
                            strokeColor="#098fe0"
                            backgroundColor="#e6e7e8"
                        />
                    </div>
                    <div onMouseEnter={toggleIconCLass} onMouseLeave={toggleIconCLass} className={hoveredIcon ? 'tb-icon-hover tb-center' : 'tb-icon tb-center'}>
                        <FaMicrophoneAlt size={52} onClick={toggleRecord} />
                    </div>
                    <div>
                        {isRecording ? <p>Recording in progress</p> : null}
                    </div>
                </div>
                <Alert show={audioError} variant="danger">Audio is too long</Alert>
                {badgeAudio ? <Button variant="outline-info" onClick={playBlob} block>Play recording</Button> : null}

                <Button disabled={!(badgeName && badgeAudio)} variant="primary" onClick={submitBadge} block>Submit</Button>
                {badgeUrl ? <p>Badge URL is: {badgeUrl}</p> : null}
            </div >
        </div >

    )
};
export default TbForm;