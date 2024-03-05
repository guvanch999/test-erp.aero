const router = require("express").Router()
const authMiddleware = require("../middleware/auth.middleware")

router.use('/auth', require("./auth.router"))
router.use("/file", authMiddleware, require("./files.router"))

module.exports = router