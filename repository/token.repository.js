const {Token} = require("../models")

exports.insertToken = async (user_id, token, refresh_token) => {
    return Token.create({user_id, refresh_token, token})
}

exports.deleteToken = async (user_id) => {
    return Token.destroy({
        where: {
            user_id
        }
    })
}

exports.getOneByRefresh = async (refresh_token) => {
    return Token.findOne({
        where: {
            refresh_token
        }
    })
}

exports.getOneByAccess = async (token) => {
    return Token.findOne({
        where: {
            token
        }
    })
}