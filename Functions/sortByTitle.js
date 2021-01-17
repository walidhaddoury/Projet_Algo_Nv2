module.exports = { sortByName };

/**
 * take JSON in params and return JSON sorted
 * @param {*} tab JSON
 */
function sortByName(tab){
        for(let i = 0; i < tab.length; i++){
          let min = i; 
          for(let j = i+1; j < tab.length; j++){
            if(tab[j].title < tab[min].title){
             min = j; 
            }
          }
          let tmp = tab[i];
          tab[i] = tab[min];
          tab[min] = tmp;
        }
        return tab;

}