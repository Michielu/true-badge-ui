import React, { useState, useEffect } from 'react';
import TbLoader from "../../partials/TbLoader/TbLoader";
import TbAuth from "../../partials/TbAuth/TbAuth";
import TbSessionStorage from "../../utils/storage/sessionStorage";

function renderAuth(isBusy, isLogin, setLogin) {
    if (isBusy) {
        return <TbLoader show={isBusy} message="Loading..." />
    }
    // const username = TbSessionStorage.getItem("username");
    // const password = TbSessionStorage.getItem("password");
    // const wrong = TbSessionStorage.getItem("asdf");
    if (isLogin) {
        return (<div>
            <h3>"Login"</h3>
            <p>{isLogin}</p>
            <div>
                <TbAuth isLogin></TbAuth>
                <small>Don't have an account? <p onClick={() => {
                    setLogin(!isLogin)
                }}>Sign up</p></small>
            </div>

        </div>)
    }
    return (
        <div>
            <h3>"Register"</h3>
            <p>{isLogin}</p>
            <div>
                <TbAuth isLogin></TbAuth>
                <small>Already have an account? <p onClick={() => {
                    setLogin(!isLogin)
                }}>Login</p></small>
            </div>
        </div>
    )
}


function Auth() {
    const [isBusy, setBusy] = useState(true);
    const [isLogin, setLogin] = useState(false);
    //Have creds be of an creds object? Interface: login and register
    //Reseach if possible/good practice
    // const [creds, setCreds] = useState();

    useEffect(() => {
        async function setWait() {
            await setTimeout(function () {
                TbSessionStorage.setItem('username', "mimimama");
                TbSessionStorage.setItem('password', "password123");
                setBusy(false);
            }, 1500);
        }
        if (isBusy) {
            setWait();
        }
    }, [isBusy])

    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.

    return renderAuth(isBusy, isLogin, setLogin);
}

export default Auth;