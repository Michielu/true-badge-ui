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
