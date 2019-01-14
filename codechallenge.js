/*
Divisors of 42 are : 1, 2, 3, 6, 7, 14, 21, 42. 
These divisors squared are: 1, 4, 9, 36, 49, 196, 441, 1764. 
The sum of the squared divisors is 2500 which is 50 * 50, a square!

Given two integers m, n (1 <= m <= n) 
we want to find all integers between m and n whose sum of squared divisors is itself a square. 
42 is such a number.

The result will be an object of key values in which the keys are the the number whose 
squared divisors is a square and then the value becomes the sum of the squared divisors.
*/
//5 kyu
function listSquared(m, n) {
  let numbers = [];
  let squares = numbers;
  let divisors = {};
  //get all the numbers between m and n.
  for (let i = m; i <= n; i++) {
    numbers.push(i);
  }
  //Get all the squares for each number using
  // a (most likely) horribly inefficient method.
  squares.forEach(number => {
    for (let i = 0; i <= number; i++) {
      number % i === 0
        ? (divisors = Object.assign({}, divisors, {
            [number]:
              divisors[number] === undefined ? [i] : divisors[number].concat(i)
          }))
        : null;
    }
  });
  //Square each of the squares: i.e. 865: 1, 5, 173, 865 -->  865: 1, 25, 29,929 etc.
  //Then sum them.
  Object.keys(divisors).forEach(num => {
    let squared = divisors[num].map(divisor => Math.pow(divisor, 2));
    let result = squared.reduce((acc, curr) => acc + curr);
    divisors[num] = result;
  });
  //Determine which numbers sum into squares.
  let finalResult = Object.keys(divisors).reduce((acc, curr) => {
    if (Number.isInteger(Math.sqrt(divisors[curr]))) {
      acc = Object.assign({}, acc, { [curr]: divisors[curr] });
      return acc;
    } else {
      return acc;
    }
  }, {});

  return finalResult;
}

/*What is an anagram? Well, two words are anagrams of each other 
if they both contain the same letters. For example:

'abba' & 'baab' == true

'abba' & 'bbaa' == true

'abba' & 'abbba' == false

'abba' & 'abca' == false
Write a function that will find all the anagrams of a word from a list.
You will be given two inputs a word and an array with words.
You should return an array of all the anagrams or an empty array if there are none. 
For example: 
  
anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) => ['aabb', 'bbaa']

anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) => ['carer', 'racer']

anagrams('laser', ['lazing', 'lazy',  'lacer']) => []
  */
//5kyu

function anagrams(word, wordList) {
  const wordOneAsArray = word.split("");
  //Get letter instances for word.
  const wordOneInstances = getInstancesAsObject(wordOneAsArray);
  //Return only the arrays that contain all the right letters.

  const wordListInstances = wordList.map(word => {
    let wordSplit = Array.from(word);
    return getInstancesAsObject(wordSplit);
  });

  //Look for anagrams.
  const anagramList = wordListInstances.map(wordInstancesObject =>
    isWordObjectAnagram(wordInstancesObject)
  );

  //Remove null entries.
  const noNullList = anagramList.filter(anagram => anagram != null);
  //Reverse getInstancesAsObject function, to turn the anagram objects into a single array.
  const anagrams = deriveWordFromObject(noNullList).map(anagramAsArray =>
    anagramAsArray.join("")
  );
  //Turn e.g. ['h', 'e', 'l', 'l', 'o'] into { h: 1, e: 1, l: 2, o: 1 }
  function getInstancesAsObject(array) {
    let returnObject = {};
    array.forEach(
      letter =>
        (returnObject = Object.assign(returnObject, {
          [letter]: returnObject[letter] ? returnObject[letter] + 1 : 1
        }))
    );
    return returnObject;
  }

  function isWordObjectAnagram(wordObject) {
    //Early check
    let res = [];
    const letters = Object.keys(wordObject);
    letters.forEach(letter => {
      if (!wordOneAsArray.includes(letter)) {
        return;
      }
    });

    Object.keys(wordOneInstances).map(oneKey =>
      Object.keys(wordObject).map(twoKey => {
        if (oneKey === twoKey) {
          wordOneInstances[oneKey] !== wordObject[twoKey]
            ? res.push(false)
            : res.push(true);
        }
      })
    );
    return !res.includes(false) ? wordObject : null;
  }

  function deriveWordFromObject(anagramObjectArray) {
    const result = anagramObjectArray.map(anagram =>
      Object.keys(anagram).map(letter => {
        let instanceStringArray = [];
        for (let i = 0; i < anagram[letter]; i++) {
          instanceStringArray.push(letter);
        }
        return instanceStringArray.join("");
      })
    );
    return result;
  }
  let finalCheck = anagrams.filter(anagram => {
    if (anagram.length === word.length) {
      return anagram;
    }
  });
  return finalCheck;
}

/*Write a function called that takes a string of parentheses, 
and determines if the order of the parentheses is valid. The function should return true if the string is valid, 
and false if it's invalid.

Examples
"()"              =>  true
")(()))"          =>  false  find the pairs. (())
"("               =>  false
"(())((()())())"  =>  true */
//110001110100100
//(1, 2,) 3),()
//
//
//5kyu
function validParentheses(parentheses) {
  let stack = [];
  const parenArray = parentheses.split("");
  parenArray.forEach(paren => {
    if (paren === "(") {
      stack.push(paren);
    } else {
      stack.pop();
    }
  });

  return stack.length === 0 ? true : false;
}
//currently incomplete

/*
I will modify the order of the list". It was decided to attribute a "weight" to numbers. 
The weight of a number will be from now on the sum of its digits.

For example 99 will have "weight" 18, 100 will have "weight" 1 so in the list 100 
will come before 99. Given a string with the weights of FFC members in normal 
order can you give this string ordered by "weights" of these numbers?

Example:
"56 65 74 100 99 68 86 180 90" ordered by numbers weights becomes: "100 180 90 56 65 74 68 86 99"
*/

function orderWeight(str) {
  let weightArr = str.split(" ");
  let weightMapToSum = {};
  let summedWeightArray = [];
  let sumWeightArr = weightArr.forEach(weight => {
    let weightUnits = weight.split("");
    let numberVer = weightUnits.map(unit => parseInt(unit));
    let sum = numberVer.reduce((acc, curr) => acc + curr);
    weightMapToSum = Object.assign({}, weightMapToSum, { [weight]: sum });
  });
  for (let prop in weightMapToSum) {
    if (weightMapToSum.hasOwnProperty(prop)) {
      summedWeightArray.push({
        key: prop,
        value: weightMapToSum[prop]
      });
    }
  }

  summedWeightArray.sort((a, b) => a.value - b.value);
  return summedWeightArray.map(weightPair => weightPair.key).join(" ");
}

/*There is an array with some numbers. All numbers are equal except for one. Try to find it!

findUniq([ 1, 1, 1, 2, 1, 1 ]) === 2
findUniq([ 0, 0, 0.55, 0, 0 ]) === 0.55
It’s guaranteed that array contains more than 3 numbers.

The tests contain some very huge arrays, so think about performance. */
//6kyu
//Since reduce only handles two items at a time. This should be a good solution.
function findUniq(array) {
  let catcher = [];
  array.reduce((acc, curr) => {
    if (acc === curr) {
      acc = acc;
    } else {
      if (array.indexOf(curr) === 0) {
        catcher.push(acc);
      } else {
        acc = curr;
        catcher.push(acc);
      }
    }
    return acc;
  });

  return catcher[0];
}

//You are given an array (which will have a length of at least 3, but could be very large) containing integers.
//The array is either entirely comprised of odd integers or entirely comprised of even integers except
//for a single integer N. Write a method that takes the array as an argument and returns this "outlier" N.
//6kyu

function oddOneOut(array) {
  let store = [];
  let even;
  //3 is the minimum to determine whether or not an array is positive or negative
  for (let i = 0; i < 2; i++) {
    array[i] % 2 === 0 ? store.push(array[i]) : null;
  }

  store.length >= 2 ? (even = true) : (odd = true);

  if (even) {
    return array.find(odd => {
      if (odd % 2 !== 0) {
        return odd;
      }
    });
  }
  {
    return array.find(even => {
      if (even % 2 === 0) {
        return even;
      }
    });
  }
}

/*
Sheldon, Leonard, Penny, Rajesh and Howard are in the queue for a "Double Cola" drink vending machine; 
there are no other people in the queue. The first one in the queue (Sheldon) buys a can, drinks it and doubles!
 The resulting two Sheldons go to the end of the queue. Then the next in the queue (Leonard) buys a can, drinks it and
  gets to the end of the queue as two Leonards, and so on.

For example, Penny drinks the third can of cola and the queue will look like this:

Rajesh, Howard, Sheldon, Sheldon, Leonard, Leonard, Penny, Penny
Write a program that will return the name of the person who will drink the n-th cola. 

store = [sheldon]
whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 52) == "Penny"
5kyu
*/
// this is horribly inefficient. So in other words I should be able to calculate it.
function whoIsNext(names, iterations) {
  let current;
  let next;
  for (let i = 0; i < iterations; i++) {
    current = names.shift();

    next = names[0];
    names.push(current);
    names.push(current);
  }
  return next;
}

/*Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.

moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0] 
5kyu
*/

function moveZeros(arr) {
  let workableArr = arr;
  let tempArr = [];
  for (let i = 0; i < workableArr.length - 1; i++) {
    if (workableArr[i] === 0) {
      let zero = workableArr.splice(i, 1).reduce((acc, curr) => acc);
      tempArr.push(zero);
    }
  }

  return workableArr.concat(tempArr);
}

/*
Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.

Examples
pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
pigIt('Hello world !');     // elloHay orldway !
5kyu
*/
function pigIt(str) {
  let words = str.split(" ");
  //for example
  const exclude = ["!", ",", ".", ":", "?"];
  let pigVerInitial = words.map(word => {
    if (!word.includes(...exclude)) {
      let splitWord = word.split("");
      let first = splitWord.shift();
      splitWord.push(first);
      let joined = splitWord.join("");
      return joined + "ay";
    } else {
      return word;
    }
  });

  return pigVerInitial.join(" ");
}

module.exports = {
  listSquared,
  anagrams,
  validParentheses,
  orderWeight,
  findUniq,
  oddOneOut,
  whoIsNext,
  moveZeros,
  pigIt
};
