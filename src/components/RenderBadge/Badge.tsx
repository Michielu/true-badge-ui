import React, { useState } from 'react';

import { Button } from "react-bootstrap";

function Badge(badgeData, audioArr) {
    //TODO call for image 
    //TODO call for audio
    //TODO handle warnings signs if something is amiss
    const [audio, setAudio] = audioArr;

    const pronounceName = () => {
        console.log("PRonouncing ", badgeData);
        //TODO play "audio"
    }

    return (
        <div className="row">
            <div className=" col-md-6 offset-md-3 col-12">

                {/* <img className="tb-badge-image" src="https://i.pinimg.com/600x315/a6/0d/68/a60d685194a7fd984d08a595a0a99ae7.jpg" alt="Profile Image"></img> */}
                <img className="tb-badge-image" src={"data:image/png;base64, " + badgeData.image.img} alt="Profile Image"></img>
                {/* <img className="tb-badge-image" src="https://lh3.googleusercontent.com/proxy/Ge1uHw6CySqerYZhvj2Qrg2Pp704TbdLrodA2E1EuL6IIFvUknlrU5-4Z41DNhvfVI4iwTwxE9gEzOuWkh0w33HUNsC4yP8aNUIqXs2YXD-H5gZYvw" alt="Profile Image"></img> */}
                <h3>{badgeData.name}</h3>
                <div className="tb-bottom-margin-10px">
                    <Button disabled={!audio} variant="primary" onClick={pronounceName} block>Pronounce</Button>
                </div>
            </div>
        </div>
    )
}

export default Badge;