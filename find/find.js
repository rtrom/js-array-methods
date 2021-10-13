function find(array, callback, configurableThis) {
  'use strict';
  let findCallback = callback;
  findCallback = callback.bind(configurableThis);

  for(let i = 0; i < array.length; i++) {
    if(findCallback(array[i], i, array)) {
      return array[i];
    }
  }

  return undefined;
}

module.exports = find;