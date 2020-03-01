import React, { useRef, useState, useEffect } from 'react';
import {
    useParams //TODO remove this import from this file
} from "react-router-dom";

import BadgeDataService from '../../api/badge/BadgeDataService';

function loadingPage() {
    return (
        <div>
            Loading...
        </div>
    )
}

function dataLoadedPage() {
    return (
        <div>
            Loaded!!
        {/* Add spinning wheel  */}
        </div>
    )
}

function invalidURLPage() {
    return (
        <div>
            <h3>Badge URL is invalid</h3>
            <p>Badge might have expired</p>
        </div>
    )
}

function validURL(badgeData) {
    return (
        <div>
            <h3>Hello!</h3>
            {badgeData.name}
        </div>
    )
}

function errorPage() {
    return (
        <div>
            <h3>Error occured</h3>
        </div>
    )
}

function handlePage(isBusy, badgeData) {
    if (isBusy) {
        return loadingPage();
    }
    if (!badgeData.isValidBadgeURL) {
        return invalidURLPage();
    }
    if (badgeData.err) {
        return errorPage();
    }
    return validURL(badgeData);
}

function RenderBadge() {
    const [isBusy, setBusy] = useState(true);
    const [badgeURL, setBadgeURL] = useState("");
    const [badgeData, setBadgeData] = useState({});
    let url: any = useParams();

    useEffect(() => {
        //Set badgeID
        setBadgeURL(url.id);
    }, [badgeURL]);

    //TODO figure this out
    useEffect(() => {
        async function callBadgeDataService() {
            const data = await BadgeDataService.get(url.id);
            setBusy(false);
            setBadgeData(data.data);
        }

        if (isBusy && url) {
            //Get badge data
            callBadgeDataService();
        }
    }, [isBusy]);

    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.

    return handlePage(isBusy, badgeData);
}

export default RenderBadge;