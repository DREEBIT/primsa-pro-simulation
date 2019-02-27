import * as _ from "lodash";
import {IChannel} from "../../types";
import randomExpNumber from "./randomExpNumber";



export default function(channel: IChannel): any[] {

    const count = _.get(channel, "ppamu") * (_.get(channel, "stopMass") - _.get(channel, "startMass")) + 1;

    const arr = new Array(count)
        .fill(undefined)
        .map((val, idx) => randomExpNumber())

    return arr;
}
