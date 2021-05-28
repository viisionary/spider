export function getLocation(): Promise<string> {
    return new Promise((resolve, rejects) => {
        function success(position: any) {
            const latitude = position.coords.latitude;
            const lonogitude = position.coords.longitude;
            resolve('北京')
        }

        function error() {
            rejects('failure')
        }

        if (!navigator.geolocation) {
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    })

}
