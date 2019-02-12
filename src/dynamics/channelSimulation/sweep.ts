import * as _ from "lodash";
import {IChannel} from "../../types";

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export default function(channel: IChannel): any[] {

    const count = _.get(channel, "ppamu") * (_.get(channel, "stopMass") - _.get(channel, "startMass"));

    const arr = new Array(count)
        .fill(undefined)
        .map((val, idx) =>
            parseFloat(`${Math.floor(getRandomArbitrary(100, 999)) / 100}e-${Math.floor(getRandomArbitrary(12, 14))}`));

    return arr;
}
