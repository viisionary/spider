import {serverAddress} from "../../constant/serverAddress";

const Client = require("socket.io-client");

export const buildSocket = () => {
    return new Client(`${serverAddress}api/socket.io`);
}

export const newVideo = ({remoteStream, containerId, userId}: any) => {
    const existed: any = document.getElementById('GuestVideo#' + userId)

    if (existed) {
        existed.srcObject = remoteStream;
        return
    }

    const GuestVideo: HTMLVideoElement = document.createElement('video');
    GuestVideo.setAttribute('width', '300')
    GuestVideo.autoplay = true;
    GuestVideo.srcObject = remoteStream;
    GuestVideo.id = 'GuestVideo#' + userId
    const videoContainer: any = document.getElementById(containerId)
    videoContainer.appendChild(GuestVideo);
}

export const removeVideo = ({containerId, userId}: any) => {
    const GuestVideo: any = document.getElementById('GuestVideo#' + userId)
    GuestVideo && GuestVideo.remove();

}
