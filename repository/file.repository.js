const {
    File
} = require("../models")

exports.insert = async (file) => {
    return File.create(file)
}

exports.getAll = async (page, limit) => {
    return File.findAndCountAll({
        offset: (page - 1) * limit,
        limit,
    })
}

exports.delete = async (fileId) => {
    return File.destroy({where: {id: fileId}})
}

exports.getOneById = async (fileId) => {
    return File.findOne({where: {id: fileId}})
}

exports.update = async (fileId, fileDto) => {
    console.log(fileId)
    const file = await File.findOne({
        where: {id: fileId}
    })

    if (!file) {
        return {
            success: false,
            message: "File not found"
        }
    }
    const oldFile = file.name
    await file.set(fileDto).save()
    return {
        success: true,
        data: {
            ...file.dataValues,
            oldFile
        },
    }
}

