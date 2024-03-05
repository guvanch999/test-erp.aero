const fileRepository = require("../repository/file.repository")
const {deleteFile} = require("../utils/file.util");
exports.getAllFiles = async (page, limit) => {
    return fileRepository.getAll(page, limit)
}


exports.create = async (file) => {
    return fileRepository.insert(file)
}

exports.deleteFile = async (fileId) => {
    const file = await fileRepository.getOneById(fileId)
    if (!file) {
        return {
            success: false, message: "File not found"
        }
    }
    deleteFile(`./files/${file.name}`)
    await fileRepository.delete(file.id)
    return {
        success: true
    }
}

exports.getDetail = async (fileId) => {
    return await fileRepository.getOneById(fileId)
}

exports.updateFile = async (fileId, fileDto) => {
    const data = await fileRepository.update(fileId, fileDto)
    if (!data.success) {
        deleteFile(`./files/${fileDto.name}`)
        return data
    }
    deleteFile(`./files/${data.data.oldFile}`)
    return data
}