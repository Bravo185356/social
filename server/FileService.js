const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class FileService {
    async saveFile(file) {
        const fileName = uuid.v4() + '.jpg'
        const filePath = path.resolve('static', fileName)
    }
    async deleteFile(file) {
        const filePath = path.resolve('static', file)
        fs.unlink(filePath, () => {
            console.log('удалено')
        })
    }
}

module.exports = new FileService()