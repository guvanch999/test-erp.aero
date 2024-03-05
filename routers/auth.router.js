const router = require("express").Router()
const AuthController = require("../controllers/auth.controller")
const registerSchema = require('../schemas/register.schema')
const loginSchema = require('../schemas/login.scema')
const refreshSchema = require("../schemas/refresh.scema")
const validator = require("../middleware/json-validator")
const authMiddleware = require("../middleware/auth.middleware")

router.post("/signup", validator({body: registerSchema}), AuthController.register)
router.post("/signin", validator({body: loginSchema}), AuthController.login)
router.post("/signin/new_token", validator({body: refreshSchema}), AuthController.refresh)
router.get('/info', authMiddleware, AuthController.info)
router.get('/logout', authMiddleware, AuthController.logout)
module.exports = router