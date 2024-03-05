const asyncHandler = require("express-async-handler");
const {getFileExtension} = require("../utils/file.util");
const fileService = require("../service/file.service")
const fs = require("fs")
exports.uploadFile = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false, message: 'No file uploaded'
        })
    }

    const file = {
        name: req.file.originalname,
        extension: getFileExtension(req.file.filename),
        mime_type: req.file.mimetype,
        size: req.file.size,
        user_id: req.user_id
    }

    const fileEn = await fileService.create(file)

    return res.status(200).json(fileEn)
})


exports.getFiles = asyncHandler(async (req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 10

    const data = await fileService.getAllFiles(page, limit)

    return res.status(200).json(data)
})

exports.deleteFile = asyncHandler(async (req, res) => {
    const data = await fileService.deleteFile(req.params.id)
    return res.status(data.success ? 200 : 400).json(data)
})

exports.getDetail = asyncHandler(async (req, res) => {
    const data = await fileService.getDetail(req.params.id)
    if (!data) {
        return res.status(404).json({
            success: false,
            message: "Cannot find file"
        })
    }
    return res.status(200).json(data)
})

exports.updateFile = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false, message: 'No file uploaded'
        })
    }

    const file = {
        name: req.file.originalname,
        extension: getFileExtension(req.file.filename),
        mime_type: req.file.mimetype,
        size: req.file.size,
        user_id: req.user_id
    }

    const data = await fileService.updateFile(req.params.id, file)
    return res.status(data.success ? 200 : 400).json(data)
})

exports.sendFile = asyncHandler(async (req, res) => {
    const file = await fileService.getDetail(req.params.id)
    if (!file) {
        return res.status(404).json({
            success: true,
            message: "File not found"
        })
    }
    res.setHeader("content-type", file.mime_type);
    fs.createReadStream(`./files/${file.name}`).pipe(res);
})