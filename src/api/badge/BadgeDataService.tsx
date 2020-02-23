import axios from "axios";
const find = () => {

};

const get = () => {

};

const create = async ({ badgeAudio, badgeImage, badgeName }) => {
    console.log("Badge stuff: ", badgeAudio, badgeImage, badgeName);
    const url = "/badge/upload";
    const formData = new FormData();
    formData.append("name", badgeName);
    const urlBody = {
        "audio": badgeAudio,
        "image": badgeImage,
        "name": badgeName
    }
    const stringified = JSON.stringify(urlBody)
    console.log("Stringified: ", stringified);
    // const data: any = { //TODO change this any
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //         // 'Content-Type': 'multipart/form-data'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     redirect: 'follow', // manual, *follow, error
    //     referrerPolicy: 'no-referrer', // no-referrer, *client
    //     body: formData // body data type must match "Content-Type" header
    // };

    // const response = await fetch(url, data);
    const response = axios({
        method: 'post',
        url: url,
        data: urlBody
    });

    console.log('Response: ', response);
    return response;
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
    console.log("Response: ", response);
    const body = await response.json();
    return body;
}

const BadgeDataService = {
    find,
    get,
    create,
    test
};



export default BadgeDataService;