const {
    Users
} = require("../models")


exports.createUser = async (userDto) => {
    return Users.create(userDto)
}

exports.getUserByEmail = async (email) => {
    return Users.findOne({where: {email}})
}


exports.getUserById = async (userId) => {
    return Users.findOne({where: {id: userId}})
}