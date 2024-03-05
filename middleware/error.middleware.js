const {ValidationError} =require("express-json-validator-middleware")
module.exports = (error, request, response, next) => {
    // Check the error is a validation error
    if (error instanceof ValidationError) {
        // Handle the error
        return  response.status(400).send(error.validationErrors);

    } else {
        console.log(error)
        return response.json(error);
    }
}