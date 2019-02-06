import { serverStart } from "express-mock-server";
import * as _ from "lodash";
import root from "./root";
import sources from "./sources";


const init = (configArg: {
  port?: number,
  controlApiUrl?: string,
}) => {

  const config = _.defaults(configArg, {
    controlApiUrl: "/mmsp",
    port: 8000,
  });

  const app = serverStart([sources], config);

  const server = app._events.request;

  server.get("/", root);

  return app;

};

export default init;
