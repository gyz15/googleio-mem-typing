// INFO:    Accepts an array with n levels, each element (levels) contain m amount of phrases. 
//          Return an array with n length, each element should be a random phrase from the level
export const selectPhrase = (phrasesArr) => {
    return phrasesArr.map(elemArr => elemArr[Math.floor(Math.random() * elemArr.length)]);
  };