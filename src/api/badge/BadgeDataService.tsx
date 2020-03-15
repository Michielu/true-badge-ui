import axios from 'axios';

import axiosRequest from "../../utils/axiosRequest";

const get = async (badgeURL) => {
    const URL = '/b/' + badgeURL;
    const badgeData = await axiosRequest.get(URL);
    let imageData;

    let audioData = await getAudio(badgeData.data.audioKey);
    //Do checks
    if (badgeData.data.imageKey) {
        imageData = await getImage(badgeData.data.imageKey);
    }

    if (audioData.status != 200) {
        //Do some checking
        //Might do this elsewhere
    }

    const badgeRequirements = {
        name: badgeData.data.name,
        isValidBadgeURL: badgeData.data.isValidBadgeURL,
        image: imageData ? imageData.data.result[0] : null,
        audio: audioData.data.result[0]
    }
    return badgeRequirements;
};

const create = async ({ badgeAudio, badgeImage, badgeName }) => {
    //TODO Store badgeAudio. Return Id
    let audioID;
    if (badgeAudio) {
        audioID = await storeAudio(badgeAudio);
    }
    console.log("AudioID: ", audioID);

    //https://github.com/axios/axios/issues/318 for blobs
    let imageID;
    if (badgeImage) {
        imageID = await storeImage(badgeImage);
    }

    const URL = "/badge/upload";

    const data = {
        name: badgeName,
        imageID,
        audioID,
        time: Date.now()
    }
    const response = await axiosRequest.post(URL, data);
    return response;
};

const storeImage = async (badgeImage) => {
    const URL = "image/upload";
    var bodyFormData = new FormData();
    bodyFormData.append('file', badgeImage[0]);

    const imageResponse = await axios({
        method: 'post',
        url: URL,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (imageResponse.data.err) {
        //TODO error handling
    }
    return imageResponse.data.result;
}

const getImage = async (imageID) => {
    //TODO handle null images
    const URL = '/image/' + imageID;
    const res = await axiosRequest.get(URL);
    return res;
};

const storeAudio = async ({ blob }) => {
    const URL = "audio/upload";
    console.log("badgeAudio: ", blob);
    var bodyFormData = new FormData();
    bodyFormData.append('file', blob);

    const audioResponse = await axios({
        method: 'post',
        url: URL,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (audioResponse.data.err) {
        //TODO error handling
    }
    return audioResponse.data.result;
}

const getAudio = async (audioID) => {
    //TODO handle null images
    const URL = '/audio/' + audioID;
    const res = await axiosRequest.get(URL);
    return res;
};


//Works with java boot backend
const test = async () => {
    const url = "/photos/retrieve";
    const urlBody = {
        "id": "5d93f86afc0f8f0bb8088811"
    }
    const data: any = { //TODO change this any
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(urlBody) // body data type must match "Content-Type" header
    };
    const response = await fetch(url, data); //TODO switch to using axios
    //https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5
    const body = await response.json();
    return body;
}

const BadgeDataService = {
    get,
    create,
    test
};



export default BadgeDataService;