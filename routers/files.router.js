const router = require("express").Router()
const filesController = require("../controllers/files.controller")
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
})
const upload = multer({
    storage
})
router.post("/upload", upload.single("file"), filesController.uploadFile)

router.get("/list", filesController.getFiles)

router.delete("/delete/:id", filesController.deleteFile)

router.get("/download/:id", filesController.sendFile)
router.get("/:id", filesController.getDetail)

router.put("/update/:id", upload.single("file"), filesController.updateFile)


module.exports = router