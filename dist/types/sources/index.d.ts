declare const mocks: {
    request: {
        method: string;
        path: string;
    };
    response: (urlParams: any, qsParams: any, bodyParams: any) => {
        body: string;
        statusCode: number;
    };
}[];
export default mocks;
