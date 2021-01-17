module.exports = { sortByDate };

/**
 * take a JSON in params and return json sorted
 * @param {*} tab JSON 
 */
function sortByDate(tab){
    for(let i = 0; i < tab.length; i++){
      let min = i; 
      for(let j = i+1; j < tab.length; j++){
        if(tab[j].release_date < tab[min].release_date){
         min = j; 
        }
      }
      let tmp = tab[i];
      tab[i] = tab[min];
      tab[min] = tmp;
    }
    return tab;
  };
