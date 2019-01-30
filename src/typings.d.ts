declare module "lodash";
declare module "glob";
declare module "express-mock-server";

declare module "*.json" {
    const value: any;
    export default value;
}
