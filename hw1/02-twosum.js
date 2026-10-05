/** Exercise 02 - Two Sum

Problem:

You are given an array of integers 'nums' and an integer 'target', write a function that returns indices of the two 
numbers such that they add up to target.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

**/

const hashMapSetUp = function HashMapSetUp(numbers) {
  let hashMap = new Map();

  for (let i = 0; i < numbers.length; i += 1) {
    hashMap.set(numbers[i], i); // the key will always contain the last index of that number in the array
  }

  return hashMap;
};

const twoSum = function TwoSum() {
  const numbers = [1, 7, 6, 4, 3];
  let target = 4;

  const hashMap = hashMapSetUp(numbers);

  const found = [];

  if (numbers.length < 2) {
    console.log("Array must contain at least 2 numbers");
    return;
  }

  for (let i = 0; i < numbers.length; i += 1) {
    let remainderNeeded = target - numbers[i];
    let indexOfRemainder = hashMap.get(remainderNeeded);

    // Remainder not present in array
    if (indexOfRemainder !== undefined) {
      // I want to make sure that the same index does not count twice
      if (indexOfRemainder != i) {
        found.push(i);
        found.push(indexOfRemainder);

        console.log(found);

        return;
      }
    }
  }

  console.log("A sum was not found");
};

twoSum();
