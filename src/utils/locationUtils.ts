import {endsWith} from "lodash";

export function getLocation(): Promise<string> {
    return new Promise((resolve, rejects) => {
        function success(position: any) {
            const latitude = position.coords.latitude;
            const lonogitude = position.coords.longitude;
            resolve('北京');
        }

        function error() {
            rejects('failure');
        }

        if (!navigator.geolocation) {
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    });
}

export const checkProtocol: (url: string) => { isFlv: boolean, isHls: boolean } = (url) => {
    const isFlv = endsWith(url, '.flv')
    const isHls = endsWith(url, '.m3u8')
    return {
        isFlv,
        isHls
    }
}