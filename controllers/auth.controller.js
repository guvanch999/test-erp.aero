const asyncHandler = require("express-async-handler");
const authService = require("../service/auth.service")
exports.register = asyncHandler(async (req, res, next) => {
    const data = await authService.registerUser(req.body)
    if (!data.success) {
        return res.status(400).json(data)
    }
    data.data.password = undefined
    return res.status(200).json(data)
});

exports.login = asyncHandler(async (req, res, next) => {
    const data = await authService.login(req.body.email, req.body.password)
    if (!data.success) {
        return res.status(400).json(data)
    }
    return res.status(200).json(data)
});

exports.refresh = asyncHandler(async (req, res) => {
    const data = await authService.refreshToken(req.body.refresh_token)
    if (data.success) {
        return res.status(400).json(data)
    }
    return res.status(200).json(data)
})

exports.info = asyncHandler(async (req, res) => {
    const user = await authService.getUserById(req.user_id)
    user.password = undefined
    return res.status(200).send(user.email)
})


exports.logout = asyncHandler(async (req, res) => {
    await authService.logout(req.user_id)
    return res.status(200).json({
        success: true
    })
})