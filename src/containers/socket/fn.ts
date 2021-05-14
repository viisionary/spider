const Client = require("socket.io-client");

export const buildSocket =  (address:string) => {
    //

    return new Client(address)
}
