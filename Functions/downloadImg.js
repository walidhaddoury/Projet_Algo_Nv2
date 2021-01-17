module.exports = { downloadImage };

const fs = require('fs');
const request = require('request');


const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
        request(url).pipe(fs.createWriteStream(path)).on('close', callback);
    })
}

/**
 * Take in param thee link and a path (directory and file name with format) and send a requet to download it
 * @param {*} url Take url for download images
 * @param {*} path path of the directory and file name with format of image
 */
function downloadImage(url, path, file) {
    download(url, path + '/' + file.replace(/[\/:*?"<>| ]/g, '_') + '.png', () => { })
}
