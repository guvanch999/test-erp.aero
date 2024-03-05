const fs = require("fs")
exports.getFileExtension = (filename) => {
    return filename.split('.').pop();
}

exports.deleteFile = (path) => {
    fs.unlink(path, err => {
        if (err) {
            console.error(err)
        }
    })
}