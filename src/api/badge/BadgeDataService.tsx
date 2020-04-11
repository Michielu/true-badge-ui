import axios from 'axios';

import axiosRequest from "../../utils/axiosRequest";

interface GetBadgeInterface {
    data: GetBadgeInterfaceData
};
interface GetBadgeInterfaceData {
    _id: string,
    name: string,
    imageID: string | null
    audioID: string,
    timestamp: number,
    badgeURL: string,
    expirationCode: number,
    isValidBadgeURL: boolean
};

interface CreateBadgeInterface {
    name: string,
    imageID: string,
    audioID: string,
    timestamp: number
}

interface GetMediaInterface {
    data: { result: AudioResult[] } | { result: ImageResult[] },
    status: number,
    statusText: string
}

interface AudioResult {
    _id: string,
    description: string | null,
    contentType: "image/jpeg" | "image/png",
    size: number,
    audio: any
}

interface ImageResult {
    _id: string,
    description: string | null,
    contentType: "image/jpeg" | "image/png",
    size: number,
    img: any
}

interface BlobInterface {
    size: number,
    type: "audio/webm;codecs=opus"
}

// interface BadgeDataInterface{
//     name: string,
//     isValidBadgeURL: boolean,
//     image: imageData ? imageData.data.result[0] : null,
//     audio: audioData.data.result[0]
// }

const get = async (badgeURL) => {
    //need the leading '/' or local ui adds another '/b' 
    const URL = addPrefixForProd('/b/' + badgeURL);

    let badgeData;
    try {
        badgeData = await axiosRequest.get(URL);

        let imageData: GetMediaInterface | undefined;

        let audioData: GetMediaInterface = await getAudio(badgeData.data.audioID);
        //Do checks
        if (badgeData.data.imageID) {
            imageData = await getImage(badgeData.data.imageID);
        }

        if (audioData.status !== 200) {
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
    } catch{
        return { "code": 404 };
    }
};

const create = async ({ badgeAudio, badgeImage, badgeName }) => {
    try {
        let audioID;
        if (badgeAudio) {
            audioID = await storeAudio(badgeAudio);
            console.log("audioID: ", audioID)
        }

        //https://github.com/axios/axios/issues/318 for blobs
        let imageID;
        if (badgeImage) {
            imageID = await storeImage(badgeImage);
            console.log("Image ID :", imageID);
        }

        const URL = addPrefixForProd("/badge/upload");

        const data: CreateBadgeInterface = {
            name: badgeName,
            imageID,
            audioID,
            timestamp: Date.now()
        }
        const response = await axiosRequest.post(URL, data);
        return response;
    } catch{
        return {
            "data": {
                "errorMessage": "Error - server error"
            }
        }
    }
};

const storeImage = async (badgeImage) => {
    const URL = addPrefixForProd("image/upload");
    var bodyFormData = new FormData();
    bodyFormData.append('file', badgeImage);

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
    //need the leading '/' or local ui adds another '/b' 
    const URL = addPrefixForProd('/image/' + imageID);
    const res = await axiosRequest.get(URL);
    return res;
};

const storeAudio = async ({ blob }) => {
    const URL = addPrefixForProd("audio/upload");
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
    //need the leading '/' or local ui adds another '/b' 
    const URL = addPrefixForProd('/audio/' + audioID);
    const res = await axiosRequest.get(URL);
    return res;
};

const addPrefixForProd = (url) => {
    if (process.env.NODE_ENV === 'production') {
        return '/api/' + url;
    }
    return url;
}

const BadgeDataService = {
    get,
    create
};

export default BadgeDataService;