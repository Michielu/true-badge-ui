import React, { useState, useEffect } from 'react';
import {
    useParams //TODO remove this import from this file
} from "react-router-dom";

import Badge from "./Badge";
import BadgeDataService from '../../api/badge/BadgeDataService';
import TbLoader from "../../partials/TbLoader/TbLoader";

function loadingPage() {
    return (
        <div>
            <TbLoader message="Loading..." />
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
    return Badge(badgeData);
}

function RenderBadge() {
    const [isBusy, setBusy] = useState(true);
    const [badgeURL, setBadgeURL] = useState("");
    const [badgeData, setBadgeData] = useState({});

    let url: any = useParams();

    useEffect(() => {
        //Set badgeID
        setBadgeURL(url.id);
    }, [badgeURL, url]);

    //TODO error handling
    useEffect(() => {
        async function callBadgeDataService() {
            const data = await BadgeDataService.get(url.id);
            setBusy(false);
            setBadgeData(data);
        }

        if (isBusy && url) {
            callBadgeDataService();
        }
    }, [isBusy, url]);

    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.

    return handlePage(isBusy, badgeData);
}

export default RenderBadge;