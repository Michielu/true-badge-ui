import React, { useState } from 'react';

import { Button } from "react-bootstrap";

function Badge(badgeData, audioArr) {
    //TODO call for image 
    //TODO call for audio
    //TODO handle warnings signs if something is amiss
    const [audio, setAudio] = audioArr;

    const pronounceName = () => {
        console.log("PRonouncing ", badgeData.name);
        //TODO play "audio"
    }

    return (
        <div className="row">
            <div className=" col-md-6 offset-md-3 col-12">
                <img className="tb-badge-image" src="https://i.pinimg.com/600x315/a6/0d/68/a60d685194a7fd984d08a595a0a99ae7.jpg" alt="Profile Image"></img>
                {/* <img className="tb-badge-image" src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg" alt="Profile Image"></img> */}
                <h3>{badgeData.name}</h3>
                <Button disabled={!audio} variant="primary" onClick={pronounceName} block>Pronounce</Button>

            </div>
        </div>
    )
}

export default Badge;