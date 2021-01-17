module.exports = { filterByYearNotSorted, getAndDisplay };

const cT = require('./convertTime');
const d = require('./downloadImg');
const fs = require('fs');
const request = require('request');


/**
 * filter all movies by year and print it, all movies printed gona download image in a directory
 * @param {*} tab the JSON to filter
 * @param {*} year int
 * @param {*} path name of directory to create or to push in it
 */
function filterByYearNotSorted(tab, year, save = false, path = undefined) {
    tab.forEach(element => {
        if (cT.convertTime(element.release_date) === year) {
            console.log(element.title);
            if (save && !(path === undefined)) {
                if (!(fs.existsSync(path))) {
                    fs.mkdir(path, callback => { });
                }
                if (element.poster) {
                    d.downloadImage(element.poster, path, element.title);
                }
            }
        }
    });
}


/**
 * filter all movies by year and print it in console, all movies printed are download in a directory
 * @param {*} tab Json to filter
 * @param {*} year int 
 * @param {*} path directory name 
 * @param {*} start 0
 * @param {*} end tab.length - 1
 */
function findYear(tab, year, start, end) {
    let middle = Math.floor((start + end) / 2);
    let compareTo = cT.convertTime(tab[middle].release_date);
        if (compareTo == year) {
        console.log("RETURN MIDDLE");
        console.log(middle);
        return middle;
    }
    if (year < compareTo) {
        findYear(tab, year, start, middle - 1);
    }
    else {
        findYear(tab, year, middle + 1, end);
    }
}


function getMin(tab, year, index) {
    console.log(year);
    console.log("=========")
    console.log(index);
    let i = index;
    for (; year === (cT.convertTime(tab[i].release_date)); i--) {
    }
    console.log("GET MIN")
    return i;
}


function getMax(tab, year, index) {
    let i = index;
    for (; year === (cT.convertTime(tab[i].release_date)); i++) {
    }
    console.log("GET MAX")
    return i;
}

function getAndDisplay(tab, year, save, path) {
    let index = findYear(tab, year, 0, tab.length - 1);
    console.log(6720);
    console.log(index);
    const min = getMin(tab, year, index);
    let max = getMax(tab, year, index);

    for (; min <= max; min++) {
        console.log(tab[min].title);
        if (save && !(path === undefined)) {
            if (!(fs.existsSync(path))) {
                fs.mkdir(path, callback => { });
            }
            d.downloadImage(tab[min].poster, path, tab[min].title);
        }
    }
}