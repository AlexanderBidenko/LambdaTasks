function generateError(message: string, code: number): never {
    throw { message: message, errorCode: code};
    // while (true) {}
}

generateError('An error occurred!', 500);
