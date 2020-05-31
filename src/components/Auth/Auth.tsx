import React, { useState, useEffect } from 'react';
import {
    useParams //TODO remove this import from this file
} from "react-router-dom";



function renderAuth(isBusy, isLogin) {
    return (
        <div>
            <h3>{isLogin ? "Login" : "Register"}</h3>

            <p>Input </p>
        </div>
    )
}


function Auth() {
    const [isBusy, setBusy] = useState(true);
    const [isLogin, setLogin] = useState(false);
    //Have creds be of an creds object? Interface: login and register
    //Reseach if possible/good practice
    const [creds, setCreds] = useState();



    let url: any = useParams();

    //Check if creds are cached

    // useEffect(() => {
    //     //Set badgeID
    //     setBadgeURL(url.id);
    // }, [badgeURL, url]);

    //TODO error handling
    // useEffect(() => {
    //     async function callBadgeDataService() {
    //         // const data = await BadgeDataService.get(url.id);
    //         //Wait to
    //         setBusy(false);
    //         setBadgeData(data);
    //     }

    //     if (isBusy && url) {
    //         callBadgeDataService();
    //     }
    // }, [isBusy, url]);

    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.

    return renderAuth(isBusy, isLogin);
}

export default Auth;