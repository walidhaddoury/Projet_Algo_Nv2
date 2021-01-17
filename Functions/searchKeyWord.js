module.exports = { findFilmByKeyWord };

/*
function findFilmByKeyWord(tab, keyWord, genre) {
    let result = [];
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].genres) {
            for (let j = 0; j < tab[i].genres.length; j++) {
                if (tab[i].genres[j] === genre) {
                    if (tab[i].overview.includes(keyWord)) {
                        //console.log(tab[i].title);
                        result.push(tab[i]);
                    }
                }
            }    
        }
    }
    return result;
}
*/

/**
 * travel the JSON and look first in genres if it contain "genre" then search "keyword" in overview and print it in console 
 * @param {*} tab JSON to travel
 * @param {*} keyWord string
 * @param {*} genre string
 */
function findFilmByKeyWord(tab, keyWord, genre){
    let result = [];
    tab.forEach(element => {
        if (element.genres){
            element.genres.forEach( travel => {
                if (travel === genre){
                    if (element.overview.includes(keyWord)){
                        result.push(element);
                    }
                }
            })   
        }
    });
    return result;
}
