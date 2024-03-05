const {Validator} = require("express-json-validator-middleware");
const addFormats = require("ajv-formats")

const validator = new Validator({});
addFormats(validator.ajv)
module.exports = validator.validate;