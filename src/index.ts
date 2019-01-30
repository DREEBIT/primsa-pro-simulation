import { serverStart } from "express-mock-server";
import * as _ from "lodash";
import sources from "./sources";



const init = (configArg: {
  port?: number,
  controlApiUrl?: string,
}) => {

  const config = _.defaults(configArg, {
    controlApiUrl: "/mmsp",
    port: 8000,
  });

  return serverStart([sources], config);

};

export default init;
