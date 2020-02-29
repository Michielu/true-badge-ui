import React, { useRef, useState, useEffect } from 'react';
import {
    useParams //TODO remove this import from this file
} from "react-router-dom";

function loading(setBusy) {
    return (
        <div>
            Loading...
            <button onClick={() => setBusy(false)}></button>
        </div>
    )
}

function dataLoaded(setBusy) {
    return (
        <div>
            Loaded!!
            <button onClick={() => setBusy(true)}></button>

        </div>
    )
}

function RenderBadge() {
    const [isBusy, setBusy] = useState(true);
    const [badgeID, setBadgeID] = useState(useParams());
    let { id } = useParams();

    useEffect(() => {
        //Set badgeID
        setBadgeID(id || "");
    }, [badgeID]);

    useEffect(() => {
        if (isBusy) {
            //Get badge data
            console.log("hello")
        }
    }, [isBusy]);


    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.

    return isBusy ? loading(setBusy) : dataLoaded(setBusy);
}

export default RenderBadge;