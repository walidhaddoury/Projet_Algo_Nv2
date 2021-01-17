module.exports = { convertTime };

/**
 * convert number in ms to a date and return only the year
 * @param {*} time int 
 */
function convertTime(time){
    let x = new Date(time * 1000).getFullYear();
    return x;
}
