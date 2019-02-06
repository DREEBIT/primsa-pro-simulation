import getChannel from "./getChannel";
import getScanSetup from "./getScanSetup";
import setChannel from "./setChannel";
import setClientName from "./setClientName";
import setScanSetup from "./setScanSetup";

export default {
    "/mmsp/communication/clientName/set": setClientName,
    "/mmsp/scanSetup/channel/:channelId/:key/get": getChannel,
    "/mmsp/scanSetup/channel/:channelId/get": getChannel,
    "/mmsp/scanSetup/channel/:channelId/set": setChannel,
    "/mmsp/scanSetup/get": getScanSetup,
    "/mmsp/scanSetup/set": setScanSetup,
    "/mmsp/scanSetup/:key/get": getScanSetup,
};

