const fs = require('fs');
const path = require('path');

const cD = require('./Functions/concatDate');
const wF = require('./Functions/writeFile');
const sD = require('./Functions/sortByDate');
const sN = require('./Functions/sortByTitle');
const fY = require('./Functions/searchDate');
const fK = require('./Functions/searchKeyWord');
const d = require('./Functions/downloadImg');

let allArgs = process.argv;


let start = new Date();


function allCases(index) {
    switch (allArgs[index + 1]) {
        case "transform":
            if ((fs.existsSync(allArgs[index + 2])) && (path.extname(allArgs[index + 2]) === '.json')) {
                let output = allArgs[index + 3];
                if (path.extname(output) === '.json') {
                    // Creer un nouveau fichier Json qui sert d'output
                    let movies = require('./' + allArgs[index + 2]);
                    let temp = cD.concatDate(movies);
                    wF.writeFile(output, temp);
                } else {
                    console.log("The ouput file hasn't the right extension, try again with a \".json\" file");
                }
            } else {
                console.log("File do not exist");
            }
            break;
        case "sortByDate":
            if ((fs.existsSync(allArgs[index + 2])) && (path.extname(allArgs[index + 2]) === '.json')) {
                let output = allArgs[index + 3];
                if (path.extname(output) === '.json') {
                    let movies = require('./' + allArgs[index + 2]);
                    let temp = sD.sortByDate(movies, 0, movies.length);
                    wF.writeFile(output, temp);
                } else {
                    console.log("The ouput file hasn't the right extension, try again with a \".json\" file");
                }
            } else {
                console.log("File do not exist");
            }
            break;
        case "sortByName":
            if ((fs.existsSync(allArgs[index + 2])) && (path.extname(allArgs[index + 2]) === '.json')) {
                let output = allArgs[index + 3];
                if (path.extname(output) === '.json') {
                    let movies = require('./' + allArgs[index + 2]);

                    let temp = sN.sortByName(movies);
                    wF.writeFile(output, temp);
                } else {
                    console.log("The ouput file hasn't the right extension, try again with a \".json\" file");
                }
            } else {
                console.log("File do not exist");
            }
            break;
        case "searchDate":
            if ((fs.existsSync(allArgs[index + 2])) && (path.extname(allArgs[index + 2]) === '.json')) {
                let date = parseInt(allArgs[index + 3]);
                let movies = require('./' + allArgs[index + 2]);
                let save = allArgs.includes("-save");
                let directoryName = allArgs[allArgs.indexOf("-save") + 1];
                if ((allArgs[index + 4] === 'false') || !(allArgs[index + 4])) {
                    fY.filterByYearNotSorted(movies, date, save, directoryName);
                } else {
                    fY.getAndDisplay(movies, date, save, directoryName);
                }
            } else {
                console.log("File do not exist");
            }
            break;
        case "searchKeyWord":
            if ((fs.existsSync(allArgs[index + 2])) && (path.extname(allArgs[index + 2]) === '.json')) {
                let movies = require('./' + allArgs[index + 2]);
                let keyword = allArgs[index + 3];
                let genre = allArgs[index + 4];

                let film = fK.findFilmByKeyWord(movies, keyword, genre);
                film = sD.sortByDate(film, 0, film.length);

                let save = allArgs.includes("-save");
                let directoryName = allArgs[allArgs.indexOf("-save") + 1];
                if (save && !(directoryName === undefined)) {
                    if (!(fs.existsSync(directoryName))) {
                        fs.mkdir(directoryName, callback => { });
                    }
                    d.downloadImage(film[film.length - 1].poster, directoryName, film[film.length - 1].title);
                }
                console.log(film[film.length - 1].title);
            } else {
                console.log("File do not exist");
            }
            break;
        case "help":
            console.log('\x1b[31m', "Available commands :\n" + '\x1b[34m', "sortByName <file.json> <output.json> : " + '\x1b[37m', "Sort all movies by name\n" + '\x1b[34m', "sortByDate <file.json> <output.json> : " + '\x1b[37m', "Sort all movies by release date\n" + '\x1b[34m', "transform <file.json> <output.json> : " + '\x1b[37m', "Concat release date of the movie with the title\n" + '\x1b[34m', "searchDate file.json <date> <true/false> : " + '\x1b[37m', "Find all movies with the entered date\n" + '\x1b[34m', "searchKeyWord <file.json> <keyword> <genre> : ", "\x1b[0m");
            break;
        default:
            console.log("Command not found\nPlease try '-action help' for more commands")
    }
}

let index = allArgs.indexOf("-action");
if (allArgs[2] === "-action") {
    console.log("NORMAL");
    allCases(index);
}
else if (allArgs[2] === "-save") {
    console.log("SAVE");
    allCases(index);
}
else {
    console.log('Please try "-action help" for more commands');
}

let time = new Date() - start;
console.log("Execution time : " + time + " ms");

