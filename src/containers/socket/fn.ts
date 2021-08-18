import {serverAddress} from "../../constant/serverAddress";

const Client = require("socket.io-client");

console.log(serverAddress)

export const buildSocket = () => {
    //
    return new Client(`${serverAddress === '/' ? 'http://localhost:8083/' : serverAddress}api/socket.io`);

    // return new Client(address)
}
