module.exports={writeFile};
const fs = require('fs');

/**
 * take a filename and JSON to create a file.json and push data in
 * @param {*} outputFile string file name
 * @param {*} writtenText take tab in params
 */
function writeFile(outputFile, writtenText) {
    let writtenFile = JSON.stringify(writtenText, null, "\t");
    fs.appendFileSync(outputFile,writtenFile);
}
