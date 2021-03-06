const findIndex = require('./findIndex');

test('It should run the callback array.length times', () => {
        let testArray = [1, 2, 3];
        let callbackCounter = 0;

        findIndex(testArray, function() {
             callbackCounter++;    
        });
        
        expect(callbackCounter).toBe(3);
});

test('It should have callback return the current element being processed in the array', () => {
        findIndex([1], function(element) {
                expect(element).toEqual(1);
        });
});

test('It should allow callback to have access to the index of the current element being processed in the array', () => {
        findIndex([1], function(element, index) {
                expect(index).toEqual(0);
        });
});

test('It should allow callback to have access to the original array findIndex was called on', () => {
        let testArray = [1, 2, 3]; 
        findIndex(testArray, function(element, index, originalArray) {
                expect(testArray).toBe(originalArray);
        });
});

test('It should have a configurable this object', () => {
        findIndex([1], function() {
                expect(this.description).toMatch('Configurable this object');
        }, {description: 'Configurable this object'});
});

test('It should return the index of the first element in the array that is truthy', () => {
        let foundValue = findIndex([1, 2, 3], function(number) {
                return number > 1;
        });
        expect(foundValue).toBe(1);
});

test('It should return -1 if no elements in the array are truthy', () => {
        let falseValue = findIndex([1, 2, 3], function(number) {
                return number > 3;
        });
        expect(falseValue).toBe(-1);
});

test('It should return -1 if array.length is 0', () => {
        let emptyArray = findIndex([], function() {});
        expect(emptyArray).toBe(-1);
});

test('It should not allow callback to visit indexes outside of the range', () => {
        let testArray = [1, 2, 3];
        let revisitIndex = findIndex(testArray, function(element, index, originalArray) {
                return element[3];
        });
        expect(revisitIndex).toBe(-1);
});

test('It should not allow callback to process elements added to the array after the function has been called', () => {
        let testArray = [1, 2, 3];
        let callbackCounter = 0;
        let appendedElement = findIndex(testArray, function(number) {
                testArray.push(4);
                callbackCounter++;
                return number > 3;
        });
        expect(callbackCounter).toEqual(3);
        expect(appendedElement).toBe(-1);
});

test('It should allow an existing, unvisited element of the array to be changed by callback and have its value passed to callback wwhen its index is visited', () => {
        let testArray = [1, 2, 3];
        let appendedElement = findIndex(testArray, function(element, index, originalArray) {
                originalArray[1] = 4;
                return element  === 4;
        });
        expect(appendedElement).toBe(1);
});

test('It should visit empty indexes in the array', () => {
        let testArray = [1, 2, , , 3];
        let callBackCounter = 0;
        findIndex(testArray, function() {
                callBackCounter++;
        });
        expect(callBackCounter).toEqual(5);
});

test('It should visit deleted elements', () => {
        let testArray = [1, 2, 3];
        let callbackCounter = 0;
        let deletedElements = findIndex(testArray, function(element, i, originalArray) {
                callbackCounter++;
                originalArray.splice(1, 1);
                return element === 4;
        });
        expect(callbackCounter).toEqual(3);
        expect(deletedElements).toEqual(-1);
});
