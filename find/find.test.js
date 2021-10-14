const find = require('./find');

const testArray = [1, 2, 3];

  test('It should run callback() for each element in the array', () => {
    let callBackCounter = 0;
    find(testArray, function() {
      callBackCounter++;
    });

   expect(callBackCounter).toBe(3);
  });

  test('It should run callback() for each element in the array, even if they have unassigned values', () => {
    let callBackCounter = 0;
    find([1, , 3, , 5], function() {
      callBackCounter++;
    });

   expect(callBackCounter).toBe(5);
  });


test('It should return the current element in the array as the first argument to callback().', () => {
  find([1], function(element) {
    expect(element).toBe(1);
  });
});

test('It should return the current index of the current element in the array as the second argument to the callback.', () => {
  find([1], function(element, index) {
    expect(index).toBe(0);
  });
 });

 test('It should have access to the array find is being called upon.', () => {
   let testArray = [1, 2, 3];
   find(testArray, function(element, index, currentArray) {
     expect(currentArray).toEqual(testArray);
   });
 });

 test('It should have access to a configurable this object.', () => {
   find([1], function() {
     expect(this.description).toEqual('Configurable this object');
   }, {description: 'Configurable this object'});
 });

 test('It should return the first true value from the callback that is encountered.', () => {
   let foundValue = find([1, 2, 3], function(number) {
    return number > 1;
   });
   expect(foundValue).toBe(2);
 });

 test('It should return undefined if the callback is false.', () => {
   let falseValue = find([1, 2, 3], function(number) {
     return number > 3;
   });
   expect(falseValue).toBeUndefined;
 })
