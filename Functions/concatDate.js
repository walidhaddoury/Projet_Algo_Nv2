module.exports = { concatDate };

const functions = require('./convertTime');

/**
 * take all movies and concat title with release date related to it
 * @param {*} json JSON to modify
 */
function concatDate(json){
    json.forEach(element => {
        let date = functions.convertTime(element.release_date);
        element.title = element.title + " (" + date + ")";
    });
    return json;
}
