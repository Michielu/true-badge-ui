import React from 'react';

import { Button } from "react-bootstrap";

function Badge(badgeData) {
    const pronounceName = async () => {
        var snd = new Audio("data:audio/wav;base64," + badgeData.audio.audio);
        snd.play();
    }

    return (
        <div className="row tb-margin-side-none">
            <div className=" col-md-6 offset-md-3 col-12">
                {badgeData.image
                    ? <img className="tb-badge-image" src={"data:image/png;base64, " + badgeData.image.img} alt="Profile"></img>
                    : <div className="tb-badge-image tb-height-100 tb-display-flex"><i className="tb-margin-auto">No image provided</i></div>
                }
                <h3 className="tb-margin-25"><u>{badgeData.name}</u></h3>
                <div className="tb-bottom-margin-10">
                    <Button disabled={!badgeData.audio} variant="primary" onClick={pronounceName} block>Pronounce</Button>
                </div>
            </div>
        </div>
    )
}

export default Badge;