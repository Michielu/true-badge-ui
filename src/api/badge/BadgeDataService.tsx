import qs from "qs";
import axios from 'axios';

import axiosRequest from "../../utils/axiosRequest";

const get = async (badgeURL) => {
    const URL = '/b/' + badgeURL;
    const res = await axiosRequest.get(URL);
    return res;
};

const create = async ({ badgeAudio, badgeImage, badgeName }) => {
    //TODO Store badgeAudio. Return Id
    const audioID = "5e518515a66f6827aa562ce9";
    //https://github.com/axios/axios/issues/318 for blobs
    //TODO store badgeImage. Return ID
    console.log("BadgeImage: ", badgeImage);

    // const imageID = "23sdg515a66f68272asdgce2"
    const imageID = await storeImage(badgeImage);
    const URL = "/badge/upload";

    const data = {
        name: badgeName,
        imageID,
        audioID,
        time: Date.now()
    }

    // const response = await axiosRequest.post(URL, data);
    // return response;
    // return 
};

const storeImage = async (badgeImage) => {
    const URL = "image/upload";
    var bodyFormData = new FormData();
    bodyFormData.append('image', badgeImage);
    // const imageResponse = await axiosRequest.post(URL, badgeImage);
    console.log("will formdata show? ", bodyFormData)
    const imageResponse = await axios({
        method: 'post',
        url: URL,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    console.log("imageResponse: ", imageResponse);
    return imageResponse;
}

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
    console.log("Response: ", response);
    const body = await response.json();
    return body;
}

const BadgeDataService = {
    get,
    create,
    test
};



export default BadgeDataService;