// 
exports.handler = async (event) => {
    // TODO implement
    if (event.queryStringParameters.hello) {
        const response = {
        statusCode: 200,
        body: `Hello, ${(JSON.stringify(event.queryStringParameters.hello)).slice(1,-1)}!`,
    };
    return response;
    }
};
