const authService = require("../service/auth.service")
module.exports = async (request, response, next) => {
    const tokenString = request.header("authorization")
    if (!tokenString) {
        return response.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    const token = tokenString.split(" ")
    console.log(token)
    if (!token[1]) {
        return response.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    const tokenDetail = await authService.checkToken(token[1])
    if (!tokenDetail) {
        return response.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    } else {
        request.user_id = tokenDetail.user_id
        return next()
    }
}