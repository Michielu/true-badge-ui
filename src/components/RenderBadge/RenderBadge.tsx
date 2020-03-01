import React, { useRef, useState, useEffect } from 'react';
import {
    useParams //TODO remove this import from this file
} from "react-router-dom";

import BadgeDataService from '../../api/badge/BadgeDataService';

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
    const [badgeURL, setBadgeURL] = useState("");
    let url: any = useParams();

    useEffect(() => {
        //Set badgeID
        setBadgeURL(url.id);
    }, [badgeURL]);

    useEffect(() => {
        if (isBusy && url) {
            //Get badge data
            BadgeDataService.get(url.id);
        }
    }, [isBusy]);


    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.

    return isBusy ? loading(setBusy) : dataLoaded(setBusy);
}

export default RenderBadge;