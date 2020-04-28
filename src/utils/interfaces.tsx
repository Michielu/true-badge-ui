export interface ErrorMessageInterface {
    errorMessage: string,
    errorMessageLong: string
}

export interface TbUploadImageProps {
    badgeImage: any[]
}

export interface TbCropperProp {
    onImageDrop: (pic: any) => void
}

export interface GetBadgeInterface {
    data: GetBadgeInterfaceData
};
export interface GetBadgeInterfaceData {
    _id: string,
    name: string,
    imageID: string | null
    audioID: string,
    timestamp: number,
    badgeURL: string,
    expirationCode: number,
    isValidBadgeURL: boolean
};

export interface CreateBadgeInterface {
    name: string,
    imageID: string,
    audioID: string,
    timestamp: number
};

export interface GetMediaInterface {
    data: { result: AudioResult[] } | { result: ImageResult[] },
    status: number,
    statusText: string
};

export interface AudioResult {
    _id: string,
    description: string | null,
    contentType: "image/jpeg" | "image/png",
    size: number,
    audio: any
};

export interface ImageResult {
    _id: string,
    description: string | null,
    contentType: "image/jpeg" | "image/png",
    size: number,
    img: any
};

export interface BlobInterface {
    size: number,
    type: "audio/webm;codecs=opus"
};