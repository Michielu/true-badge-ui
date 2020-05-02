import React, { useState } from 'react';

import { Alert, Button, FormControl } from 'react-bootstrap';
import { ReactMic } from 'react-mic';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import BadgeDataService from "../../api/badge/BadgeDataService";
import TbAlert from "../TbAlerts/TbAlerts";
import TbModal from "../TbModal/TbModal";
import TbOverlay from "../TbOverlay/TbOverlay";
import TbSpinner from "../TbLoader/TbLoader";
import TbUploadImage from "../TbUploadImage/TbUploadImage";
import { OverlayType } from '../../utils/enums';


function TbForm() {
    const [badgeName, setBadgeName] = useState("");
    const [recording, setRecording] = useState(false);
    const [hoveredIcon, setHoveredIcon] = useState(false);
    const [badgeAudio, setBadgeAudio] = useState({
        audio: { blob: null },
        audioError: false
    });
    const [badgeModal, setBadgeModal] = useState({
        url: "",
        displayModal: false
    });
    const [createBadge, setCreateBadge] = useState({
        error: false, //used to be hasError
        errorMessages: { errorMessage: "", errorMessageLong: "" },
        displaySpinner: false
    });

    //TbModal
    const copyUrlSuccessMessage = useState('');

    //TbUploadImage
    const badgeImage = useState({
        showCroppingModal: false,
        image: null
    })

    //Name
    const handleNameChange = (event) => {
        setBadgeName(event.target.value)
    };

    //Image


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
            badgeImage: badgeImage[0].image,
            badgeName
        });
        console.log("Submit Badge!", status, {
            badgeAudio: badgeAudio.audio,
            badgeImage: badgeImage[0].image,
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
        setBadgeModal(prev => ({
            url: prev.url,
            displayModal: false
        }))
    }

    const playAudio = () => {
        const url = URL.createObjectURL(badgeAudio.audio.blob);
        const tmp = new Audio(url);
        tmp.play();
    }

    const toggleHoverIcon = () => {
        setHoveredIcon(prevState => !prevState)
    };

    return (
        <div className="row tb-center">
            <div id="tb-form" className="col-12 col-md-6 tb-center">
                <div className="tb-form-field">
                    <TbAlert variant="danger" errorMessages={createBadge.errorMessages} hasError={createBadge.error}></TbAlert>
                    <TbModal show={badgeModal.displayModal} onHide={closeBadgeURLModal} badgeUrl={badgeModal.url} copyUrlSuccessMessage={copyUrlSuccessMessage}></TbModal>
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
                    <h3>Upload Image <TbOverlay overlayType={OverlayType.TOOLTIP} message="image is optional"></TbOverlay></h3>
                    <TbUploadImage badgeImage={badgeImage}></TbUploadImage>
                </div>
                <div className="tb-form-field">
                    <h3>Record name <TbOverlay overlayType={OverlayType.TOOLTIP} message="Five seconds maximum"></TbOverlay></h3>
                    {/* TODOs
                            - Styling
                            - Counter
                            - Size limit
                            - Red dot symolizing recording
                            - change audioError to audioErrorCode
                            - Fix onhover/onClick mic styling on mobile
                        */}
                    <div onClick={toggleAudioRecord}>
                        <ReactMic
                            record={recording}
                            className="sound-wave"
                            onStop={stopRecording}
                            onData={onData}
                            strokeColor="#098fe0"
                            backgroundColor="#e6e7e8"
                        />
                    </div>
                    <div onMouseEnter={toggleHoverIcon} onMouseLeave={toggleHoverIcon} className={hoveredIcon ? 'tb-icon-hover tb-center tb-margin-10' : 'tb-icon tb-center tb-margin-10'}>
                        <FaMicrophoneAlt size={52} onClick={toggleAudioRecord} />
                    </div>
                    <div>
                        {recording ? <p className="animate-flicker">Recording</p> : null}
                    </div>
                    <Alert show={badgeAudio.audioError} variant="danger">Audio is too long</Alert>
                    {badgeAudio.audio.blob ? <Button variant="outline-info" onClick={playAudio} block>Play recording</Button> : null}
                </div>

                <Button disabled={!(badgeName && badgeAudio.audio.blob)} variant="primary" onClick={submitBadge} block>Submit</Button>
                {badgeModal.url ? <p>Badge URL is: {badgeModal.url}</p> : null}
            </div >
        </div >
    )
};
export default TbForm;