
class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
const createCustomError = (msg, statusCode) => {

    // Creating the object of the CustomAPIError class and returning it 
    return new CustomAPIError(msg, statusCode);
}

module.exports = {
    CustomAPIError,
    createCustomError
}