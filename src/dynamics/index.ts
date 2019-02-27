import getChannel from "./getChannel";
import getEM from "./getEM";
import getEmission from "./getEmission";
import getMeasurementData from "./getMeasurementData";
import getScanning from "./getScanning";
import getScanSetup from "./getScanSetup";
import setChannel from "./setChannel";
import setClientName from "./setClientName";
import setControl from "./setControl";
import setControlLock from "./setControlLock";
import setEM from "./setEM";
import setEmission from "./setEmission";
import setScanSetup from "./setScanSetup";
import setScanSetupKey from "./setScanSetupKey";

export default {
    "/mmsp/communication/clientName/set": setClientName,
    "/mmsp/scanSetup/channel/:channelId/:key/get": getChannel,
    "/mmsp/scanSetup/channel/:channelId/get": getChannel,
    "/mmsp/scanSetup/channel/:channelId/set": setChannel,
    "/mmsp/scanSetup/get": getScanSetup,
    "/mmsp/scanSetup/set": setScanSetup,
    "/mmsp/scanSetup/:key/get": getScanSetup,
    "/mmsp/scanSetup/:key/set": setScanSetupKey,
    "/mmsp/measurement/data/get": getMeasurementData,
    "/mmsp/scanInfo/scanning/get": getScanning,
    "/mmsp/communication/controlLock/set": setControlLock,
    "/mmsp/communication/control/set": setControl,
    "/mmsp/generalControl/setEM/get": getEM,
    "/mmsp/generalControl/setEmission/get": getEmission,
    "/mmsp/generalControl/setEM/set": setEM,
    "/mmsp/generalControl/setEmission/set": setEmission,
};

