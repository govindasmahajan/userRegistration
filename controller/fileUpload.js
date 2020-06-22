const axios = require('axios');
const fs = require('fs');
const path = require('path');
const empController = require('../controller/employees');
const { resolve } = require('path');

module.exports = {

    upload: (req, res, next) => {
        if (req.file.fieldname && req.file.path) {
            next();
        } else {
            res.json({ status: false, message: "Error Uploading file", data: null })
        }
    },

    download: async (req, res, next) => {
        /* sample url : https://unsplash.com/photos/_fumwVCPe1c/download?force=true */
        let url = '';
        if (req.body && req.body.imageName) {
            url = `http://localhost:3000/uploads/${req.body.imageName}`;
        }
        if (req.body && req.body.imageURL) {
            url = req.body.imageURL;
        }

        const filePath = path.resolve('downloads/', req.body.imageName)

        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream'
        })

        response.data.pipe(fs.createWriteStream(filePath));

        return new Promise((resolve, reject) => {
            response.data.on('end', () => {
                res.json({ status: true, message: "File downloaded successfully", data: null })
            })
            response.data.on('error', err => {
                res.json({ status: true, message: "Error downloading files", data: null })
            })
        })
    }
}