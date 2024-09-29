/* 
// Interesting thing with closure
{
  const a = 1;
  let a2 = 3;
  var a3 = 5;

  function f1() {
    a2++;
    console.log("f1", a2);
  }

  const f2 = function () {
    console.log("f2");
  };

  const f3 = () => {
    console.log("f3");
  };

  f1();
  f2();
  f3();
}

f1();
// f2();
// f3();

a2 = 0;
console.log("a2", a2);

f1(); // a2 = 0 will not iMPact the closure of f1
*/


// Please write your custom version of a utility for function memorization.
function memoized(c) {
  const cache = new Map();

  return (...args) => {
    const name = args.join(''); // Won't work with arrays or objects
    if (cache.has(name)) {
      return cache.get(args);
      // if (name in cache) {// NOTE: in is better because it check correct property if (cache[args]) { 
    }

    const res = c(...args);
    cache.set(args,  res);
    return res;
  }
}

// const computation = memoized((a, b) => a + b);
// console.log(computation(1, 2))
// console.log(computation(1, 2))

// Please write your own polyfill function for array.reduce.
Array.prototype.reduce2 = function(cb, initial) {
  if (typeof cb !== 'function') {
    throw new Error('cb is not a function')
  }

  if (this.length === 0) {
    return initial;
  }

  let acc = initial;
  for (let i = 0; i < this.length; i++) {
    acc = cb(acc, this[i]);
  }

  return acc;
}
// const a1 = [1, 2, 3, 4];
// console.log(a1.reduce((acc, next) => acc * next, 1))
// console.log(a1.reduce2((acc, next) => acc * next, 1))
// console.log(a1.reduce2(1, 1))
// console.log(null.reduce2(null, 1))


// Please do a code review of the example code and try for each recommendation to define a code styleguide rule that the team can agree on
// Please order the console.log outputs in the correct order (there are nested setTimeouts, promises etc.). Need good understanding of the event loop and call stack.
// Please implement quick sort
// Please implement binary search

function binarySearch(arr, target) {
  if (!arr.length) {
    return null;
  }

  let left = 0;
  let right = arr.length;
  let mid = Math.floor(arr.length / 2);
  // let index

  while (left !== right) {
    console.log(left, mid, right, target)
    if (target === arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      left = mid;
    } else if (target < arr[mid]) {
      right = mid;
    }
      mid = Math.floor((left + right) / 2) 
  }

}

// console.log(binarySearch([4, 6, 8, 10, 12, 15, 18], 18))


// Please loop through a nested Object with recursion using for...of loop

function loopNestedObject(obj, cb) {
  if (typeof obj !== 'object') {
    cb(obj)
  }
  for (let key in obj) {
    loopNestedObject(obj[key], cb)
  }
}

// console.log(loopNestedObject(
//   {
//     a: 10,
//     b: 20,
//      c: {
//       d: 13,
//       z: {
//         a: 1, b: 3, t: [12,3,4]
//       },
//       e: {
//         f: {
//           g: 122,
//         },
//         h: 9
//       }
// }}, (e) => console.log(e)))

// Find all strings in an array of strings which are palindromes
// Count the most used character in a long string
// Implement deep cloning of a nested object
// Reference of cloning an object
// Fibonacci with and without recursion
function fibonacci(n) {
  let aux = 1;
  let r = 0

  for (let i = 0; i < n; i++) {
    r += aux;
    aux = r - aux;
  }

  return r;
}


function fibonacciRef(n) {
  console.log('n', n)
  if (n === 1 || n === 0) {
    return n;
  }

  return fibonacciRef(n-1) + fibonacciRef(n-2)
}

// 5 => 4 + 5
// 4 => 3 + 5
// 3 => 2 + 5
// 2 => 2 + 5
// 1 => 1 + 5

// console.log(fibonacci(17))
// console.log(fibonacciRef(5))

// Print out Fizz for multiple of 3, Buzz for multiple of 5, Fizz Buzz for multiple of 3 and 5.

// Given a list of real words, write an algorithm that takes a start
// and end word and returns the shortest path between changing one 
// letter at a time with each step being a real word. 
function shortestWordPath(startWord, endWord, wordList) {
    const wordSet = new Set(wordList); // All valid words in a set for fast lookup
    if (!wordSet.has(endWord)) return []; // If endWord is not in the wordList, no solution

    const queue = [[startWord]]; // BFS queue initialized with the start word as a path
    const visited = new Set([startWord]); // Keep track of visited words to avoid cycles

    while (queue.length > 0) {
        const path = queue.shift(); // Get the current path from the queue
        const lastWord = path[path.length - 1]; // Last word in the current path

        console.log('path', path, lastWord, queue, )

        if (lastWord === endWord) return path;

        // Try changing each letter of the current word to form new words
        for (let i = 0; i < lastWord.length; i++) {
            for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
                const newWord = lastWord.slice(0, i) + String.fromCharCode(c) + lastWord.slice(i + 1);
                // console.log('new word', newWord)
                
                // If the new word is in the wordSet and hasn't been visited yet
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord); // Mark it as visited
                    queue.push([...path, newWord]); // Push the new path to the queue
                }
            }
        }
    }

    return []; // If no path is found, return an empty array
}

const wordList = ["flab", "slab", "slob", "blob", "blab"];
const start = "flab";
const end = "slob";
// console.log(shortestWordPath(start, end, wordList));
console.log(shortestWordPath('hit', 'cog', ["hot","dot","dog","lot","log","cog"]))
// Output: ["flab", "slab", "slob"]


// Reverse a string with your preferred language.


// Given date A and its corresponding day-of-week, find the day-of-week for some future date B.
// https://www.geeksforgeeks.org/find-day-of-the-week-for-a-given-date/
function dayofweek(d, m, y)
{
    let t = [ 0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4 ];
    y -= (m < 3) ? 1 : 0;
    return ( y + y/4 - y/100 + y/400 + t[m-1] + d) % 7;
}
 
let day = dayofweek(29, 9, 2024);
// console.log('day', day)
   

// Provide a non-heuristic solution to determine the shortest path of word transitions between two words. ex) flab -> slab -> slob. No focus on efficiency, only limit to solution is that it you need to be able to say for sure the solution is the shortest path.
// Define your own implementation for a hash map data structure in JavaScript
// Define your own implementation of a queue data structure
// Define your own implementation of a stack data structure
// Define your own implementation of a list data structure
// Define your own implementation of a linked list data structure

// You have an array of random integers. Return the first couple of integers which sum 
// equals a particular given number.  What is the Big O notation score for your algorithm?
// Can you do it without nested loops? How will you optimize your solution?
// N^2
function firstCoupleOfInts(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {

      if (arr[i] + arr[j] === target) {
        return [arr[i], arr[j]]
      }
    }
  }

  return null;
}


function firstCoupleOfInts2(arr, target) {
  const traversed = new Map();
  for (let i = 0; i < arr.length; i++) {
    const rest = target - arr[i];

    if (traversed.has(rest)) {
      return [arr[i], rest]
    } else {
      traversed.set(arr[i], arr[i])
    }
  }

  return null;
}

const a = [1, 2, 3, 5, 6, 1, 2, 3, 4, 5];
// console.log(firstCoupleOfInts(a, 12))
// console.log(firstCoupleOfInts2(a, 2))