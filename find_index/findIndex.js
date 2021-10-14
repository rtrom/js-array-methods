function findIndex(array, callback, configurableThis) {
        let arrayLength = array.length;
        let findIndexCallback = callback;
        findIndexCallback = callback.bind(configurableThis);

        for(let i = 0; i < arrayLength; i++) {
                if(findIndexCallback(array[i], i, array)) {
                 return i;
                } 
        }
        return -1;
}

module.exports = findIndex;
