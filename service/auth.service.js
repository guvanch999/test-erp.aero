const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const config = require("../config")
const userRepository = require("../repository/user.repository")
const tokenRepository = require("../repository/token.repository")

async function hashPassword(password) {
    const saltRound = 10
    return new Promise((resolve, reject) => {
        bcrypt
            .hash(password, saltRound)
            .then(hash => {
                resolve(hash)
            })
            .catch(err => reject(err))
    })
}

async function comparePassword(hash, password) {
    return new Promise((resolve, reject) => {
        bcrypt
            .compare(password, hash)
            .then(() => {
                resolve(true)
            })
            .catch(err => reject(err))
    })
}


async function generateTokens(data) {
    const access_token = jwt.sign(data, config.jwt_secret, {expiresIn: config.access_token_timeout});
    const refresh_token = jwt.sign(data, config.refresh_secret, {expiresIn: config.refresh_token_timeout})

    return {
        access_token,
        refresh_token
    }
}

async function refreshToken(user_id, tokens) {
    await tokenRepository.deleteToken(user_id)
    await tokenRepository.insertToken(user_id, tokens.access_token, tokens.refresh_token)
}

exports.registerUser = async (userDto) => {
    const user = await userRepository.getUserByEmail(userDto.email)
    if (user) {
        return {
            success: false,
            message: "User is already registered"
        }
    }
    userDto.password = await hashPassword(userDto.password)
    const newUser = await userRepository.createUser(userDto)
    return {
        success: true,
        data: newUser
    }
}


exports.login = async (email, password) => {
    try {
        const user = await userRepository.getUserByEmail(email)
        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }
        if (!(await comparePassword(user.password, password))) {
            return {
                success: false,
                message: "Password is incorrect"
            }
        }
        const tokens = await generateTokens({user_id: user.id})
        await refreshToken(user.id, tokens)
        return {
            success: true,
            data: tokens
        }
    } catch (err) {
        throw err
    }
}

exports.refreshToken = async (refreshToken) => {
    const tokenDetail = await tokenRepository.getOneByRefresh(refreshToken)
    if (!tokenDetail) {
        return {
            success: false,
            message: "Incorrect refresh token"
        }
    }
    const tokens = await generateTokens({user_id: tokenDetail.user_id})
    await refreshToken(tokenDetail.user_id, tokens)
    return {
        success: true,
        data: tokens
    }
}

exports.checkToken = async (token) => {
    const tokenDetail = await tokenRepository.getOneByAccess(token)
    if (!tokenDetail) {
        return false
    }

    try {
        if (!!jwt.verify(token, config.jwt_secret)) {
            return tokenDetail
        }
        return false
    } catch (err) {
        return false
    }

}

exports.getUserById = async (userId) => {
    return userRepository.getUserById(userId)
}

exports.logout = async (userId) => {
    await tokenRepository.deleteToken(userId)
}