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


// 1. Please write your custom version of a utility for function memorization.
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

// 2. Please write your own polyfill function for array.reduce.
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


// 3. Please do a code review of the example code and try for each recommendation to define a code styleguide rule that the team can agree on

// 4. Please implement quick sort
// NOTE: not my implementation
function partition(arr, low, high) {
    // Choose the pivot
    const pivot = arr[high];

    let i = low - 1;

    // Traverse arr[low..high] and move all smaller
    // elements on the left side. Elements from low to 
    // i are smaller after every iteration
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    // Move pivot after smaller elements and
    // return its position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// The QuickSort function implementation
function quickSort(arr, low, high) {
    if (low < high) {
        // pi is the partition return index of pivot
        const pi = partition(arr, low, high);

        console.log(arr, low, high, pi)

        // Recursion calls for smaller elements
        // and greater or equals elements
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Driver code
// const arr = [10, 7, 8, 1, 0, 9, 1, 5,];
// quickSort(arr, 0, arr.length - 1);
// console.log("\nSorted array is", arr);


// 5. Please implement binary search
function binarySearch(arr, target) {
  if (!arr.length) {
    return null;
  }

  let left = 0;
  let right = arr.length;
  let mid = Math.floor(arr.length / 2);

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

// 7. Please loop through a nested Object with recursion using for...of loop
function loopNestedObject(obj, cb) {
  if (typeof obj !== 'object') {
    cb(obj)
  }
  for (let key of Object.keys(obj)) {
    loopNestedObject(obj[key], cb)
  }
}

const nestedObj = {
  a: 10,
  b: 20,
  c: {
    d: 13,
    z: {
      a: 1, b: 3, t: [12,3,4]
    },
    e: {
      f: {
        g: 122,
      },
      h: 9
    }
  }
}
// console.log(nestedObj)
// console.log(loopNestedObject(nestedObj , (e) => console.log(e)))

// 8. Find all strings in an array of strings which are palindromes
// 9. Count the most used character in a long string
// 10. Implement deep cloning of a nested object
// 11. Reference of cloning an object
// 12. Fibonacci with and without recursion
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

// 13.  Print out Fizz for multiple of 3, Buzz for multiple of 5, Fizz Buzz for multiple of 3 and 5.

// 14. Given a list of real words, write an algorithm that takes a start
// and end word and returns the shortest path between changing one 
// letter at a time with each step being a real word. 
function shortestWordPath(startWord, endWord, wordList) {
    const wordSet = new Set(wordList); // All valid words in a set for fast lookup
    if (!wordSet.has(endWord)) return []; // If endWord is not in the wordList, no solution

    const queue = [[startWord]]; // BFS queue initialized with the start word as a path
    const visited = new Set([startWord]); // Keep track of visited words to avoid cycles

    while (queue.length > 0) {
        const path = queue.shift(); // Get the current path from the queue
      console.log(path, queue)
        const lastWord = path[path.length - 1]; // Last word in the current path

        // console.log('path', path, lastWord, queue, )

        if (lastWord === endWord) {
          return path;
        }

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
console.log(shortestWordPath(start, end, wordList));
console.log('====================================================================================')
// console.log(shortestWordPath('hit', 'cog', ["hot","dot","dog","lot","log","cog"]))
// Output: ["flab", "slab", "slob"]


// 15. Reverse a string with your preferred language.


// 16. Given date A and its corresponding day-of-week, find the day-of-week for some future date B.
// https://www.geeksforgeeks.org/find-day-of-the-week-for-a-given-date/
// NOTE: not my implementation
function dayofweek(d, m, y)
{
    let t = [ 0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4 ];
    y -= (m < 3) ? 1 : 0;
    return ( y + y/4 - y/100 + y/400 + t[m-1] + d) % 7;
}
 
let day = dayofweek(29, 9, 2024);
// console.log('day', day)
   

// 17. Provide a non-heuristic solution to determine the shortest path of word transitions between two words. ex) flab -> slab -> slob. No focus on efficiency, only limit to solution is that it you need to be able to say for sure the solution is the shortest path.
// 18. Define your own implementation for a hash map data structure in JavaScript
// 19. Define your own implementation of a queue data structure
class Queue {
  constructor () {
    this.queue = {};
    this.frontIndex = 0
    this.backIndex = 0;
  }

  // Add elements at the end of the queue.
  enqueue(item) {
    this.queue[this.backIndex] = item;
    this.backIndex++;
  }

  // Remove an element from the front of the queue.
  dequeue() {
    const toBeRemoved = this.queue[this.frontIndex];
    delete this.queue[this.frontIndex];
    this.frontIndex++;

    return toBeRemoved;
  }

  // Get the front element without removing it.
  peek() {
    return this.queue[this.frontIndex]
  }

  // Check whether an element is present in the queue or not.
  isEmpty() {
    return this.backIndex === this.frontIndex;
  }

  toString() {
    let str = ''
    for (let i = this.frontIndex; i < this.backIndex; i++) {
      str += `${this.queue[i]}, `
    }

    return str;
  }
}

// const queue = new Queue()
// queue.enqueue(7);
// queue.enqueue(2);
// queue.enqueue(6);
// queue.enqueue(4);
// console.log(queue.dequeue())
// console.log(queue.peek())
// console.log(String(queue))




// 20. Define your own implementation of a stack data structure
// const stack = [];
// stack.push(2);       // stack is now [2]
// stack.push(5);       // stack is now [2, 5]
// const i = stack.pop(); // stack is now [2]
// 21. Define your own implementation of a list data structure
// 22. Define your own implementation of a linked list data structure
class LLNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class LinkedList {
  #size = 0;
  #head = null

  add(element) {
    let node = new LLNode(element);
    let current = null;

    if (this.#head === null) {
      this.#head = node;
    } else {
      current = this.#head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this.#size++;
  }

  insertAt(element, index) {
    if (index < 0 || index > this.#size) {
      throw new Error('Index is invalid')
    }


    let current = this.#head;
    let prev = null;
    let currentIdx = 0;
    let node = new LLNode(element);

    if (index === 0) {
      node.next = current;
      this.#head = node;
      this.#size++;
    } else {
      while(current.next) {
        if(index === currentIdx) {
          console.log(current)
          node.next = current;
          prev.next = node;
          this.#size ++;
        }

        prev = current;
        current = current.next;
        currentIdx++;
      }
    }
  }


  // removes an element from the specified location
  removeFrom(index) {
    if (index < 0 || index >= this.#size) {
      throw new Error('Index is invalid')
    }

    let current = this.#head;
    let prev = null;
    let currentIdx = 0;

    if (index === 0) {
      this.#head = current.next;
      this.#size--;
    } else {
      while (current) {
        if (currentIdx === index) {
          prev.next = current.next;
          this.#size--;
          break;
        }


        prev = current;
        current = current.next;
        currentIdx++;
      }
    }
  }

  // removes a given element from the
  // list
  removeElement(element) {
    let current = this.#head;
    let prev = null;
    let currentIdx = 0;

    while (current) {
      if (current.value === element) {
        if (currentIdx === 0) {
          this.#head = current.next;
          this.#size--;
          break;
        }

        prev.next = current.next;
        this.#size--;
        break;
      }
      


      prev = current;
      current = current.next;
      currentIdx++;
    }
  }

  // finds the index of element
  indexOf(element) {}

  /**
   * 
   * @returns number of elements
   */
  length() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }


  toString() {
    let curr = this.#head;
    let str = '';

    while (curr) {
      str += curr.value + ', ';
      curr = curr.next;
    }

    return str;
  }
}

// const ll = new LinkedList();
// ll.add(3);
// ll.add(4);
// ll.add(5);
// ll.add(6);
// ll.add(5);
// console.log(String(ll))

// ll.insertAt(9, 2)
// ll.insertAt(8, 0)
// // ll.insertAt(8, 6)
// console.log(String(ll))
// ll.removeFrom(4)
// console.log(String(ll))
// ll.removeFrom(5)
// ll.removeElement(16)
// console.log(String(ll))

// 23. You have an array of random integers. Return the first couple of integers which sum 
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

// BFS algorithm
function bfs(graph, vertex, cb) {
  const queue = [];
  const visited = new Set([]);

  queue.push(vertex)
  visited.add(vertex);

  while (queue.length > 0) {
    const currentNode = queue.shift();
    
    for (let i = 0; i < graph[currentNode].length; i++) {
      const adj = graph[currentNode][i];

      if (!visited.has(adj)) {
        cb(adj)
        visited.add(adj);
        queue.push(adj);
      }
    }
  }
}


// const vertexN = 5;
// const myGraph = Array.from({length: vertexN}, () => [])

// // console.log(myGraph[1].length)
// // Function to add an edge to the graph
// function addEdge(adj, u, v) {
//     adj[u].push(v);
//     adj[v].push(u);
// }

// addEdge(myGraph, 0, 1);
// addEdge(myGraph, 0, 2);
// addEdge(myGraph, 1, 3);
// addEdge(myGraph, 1, 4);
// addEdge(myGraph, 2, 4);
// console.log(myGraph)

// bfs(myGraph, 0, console.log)



// function debounce(cb, timeout) {
//   let timerId = null;

//   return (...args) => {
//     if (timerId) {
//       clearTimeout(timerId);
//     }

//     timerId = setTimeout(() => {
//       cb(...args)
//     }, timeout);
//   }
// }


// const log = debounce((...args) => console.log('log it', ...args), 400);
// log(1);
// log(2);
// log(3);


// setTimeout(() => {
//   log(5);
//   log(6);
// }, 500)


// return pivot position
function pivot2(arr, start, end) {
  const pv = arr[end];
  let pvIdx = start;

  for (let i = start; i < end; i++) {
    if (pv >= arr[i]) {
      const aux = arr[pvIdx];
      arr[pvIdx] = arr[i];
      arr[i] = aux;
      pvIdx++;
    }
  }

  const aux = arr[pvIdx];
  arr[pvIdx] = arr[end];
  arr[end] = aux;
  return pvIdx;
}

function quickSorting(arr, start, end) {
  if (start < end) {
    const pv = pivot2(arr, start, end);
    console.log(pv, start ,end)
    quickSorting(arr, start, pv - 1);
    quickSorting(arr, pv + 1, end)
  }
}

// function toTimeout(cb) {
//   const maxExecutionTime = 1000;  // 1 second limit
//   const startTime = Date.now();

//   while(true) {
//     console.log('aaa')
//     cb();


//     if (Date.now() - startTime > maxExecutionTime) {
//       throw new Error('Loop took too long, breaking out!')
//     }
//   }
// }


function withTimeout(fn, timeout = 1000) {
  return new Promise((resolve, reject) => {
    // Start a timer that will reject after the timeout
    const timer = setTimeout(() => {
      reject(new Error(`Function execution timed out after ${timeout}ms`));
    }, timeout);

    // Run the provided function
    Promise.resolve(fn())
      .then((result) => {
        clearTimeout(timer); // Clear the timeout if function finishes in time
        resolve(result); // Resolve with the function result
      })
      .catch((error) => {
        clearTimeout(timer); // Clear the timeout on function error
        reject(error); // Reject with the function error
      });
  });
}


const arr = [4, 2, 1, 6, 4, 2, 3];
// [4, 1, 6, 2, 3]
// [4, 1, 6, 2, 3]
//              ^
// [1, 2, 3, 4, 6]
// [1, 2, 3] [4, 6]        


// [6, 5, 4, 3, 2, 1]
//                 ^
// [1, 6, 5, 4, 3, 2]
// [1][6, 5, 4, 3, 2]
//                 ^

console.log(arr)
quickSorting(arr, 0, arr.length - 1);
console.log(arr)


// sunt foarte buni
// sunt o persoana pozitiva, vorbesc frumos, 

// [x] este important sa vorbesc in timpul live coding, am inteles bine intrebarea? asta trebuie facut?
// [x] zambeste
// pot sa vin cu idee, m-am gandit la asta, pot sa fac asa...
// Add type check and throw errors
// cel mai important, sa vorbesc,
// intrebarile date au fost din word => De repetat
// Big(O) , in timp de live coding chiar
// Async operations with log
// exercitiile dificele ii pare prea mult pentru interviu
// sa fiu transparent, in caz ca uit ceva
// trebuie sa arat ca pot gandi algoritmic
// cineva a facut struggle => Nu trebuie
// cum as testa functia, ce valori am pune
// nu trebuie de facut in minte, dar cu glas pentru a vedea cum gandesc
// trebuie de pregatit sa ma prezint catre ei
// ei vor o persoana cu care pot lucra, nu arogant, nu se enerveaza
// ar putea sa ma provoce, sa fiu calm, sa raspund frumos
// cum as face un site de genul la cu betting si scoruri. Tehnologii..., responsive design..., 
// sunt primul care va trece interviul decat a venit Ist

// tell me more about the project, the tech stack, your best practices...

// mie nu mi-o intrebat



// the most frequent character:

/**
 * 
 * @param {String} str 
 * @returns {Number} 
 */
function theMostFreqCh(str) {
  let theM = '';
  let numberOfTimes = 0;
  let freq = new Map();

  let filteredStr = str.toLocaleLowerCase().replaceAll(new RegExp('[^A-Za-z0-9]', 'g'), '')
  console.log(filteredStr)


  for (let ch of filteredStr) {
    freq.set(ch, freq.has(ch) ? freq.get(ch) + 1 : 1 )
    if (freq.get(ch) > numberOfTimes) {
      theM = ch;
      numberOfTimes = freq.get(ch);
    }
  }

  console.log(freq, theM, numberOfTimes)

  return numberOfTimes;
}


const str = 'There was a time in the past when 2432'
console.log(theMostFreqCh(str))


// Subject (Observable)
class Subject {
    constructor() {
        this.observers = [];  // List of observers
    }

    // Add an observer
    subscribe(observer) {
        this.observers.push(observer);
    }

    // Remove an observer
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Notify all observers
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

// Observer
class Observer {
    constructor(name) {
        this.name = name;
    }

    // Called when the subject notifies observers
    update(data) {
        console.log(`${this.name} received data: ${data}`);
    }
}

// Example usage:

// Create the subject
const subject = new Subject();

// Create some observers
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

// Subscribe the observers to the subject
subject.subscribe(observer1);
subject.subscribe(observer2);

// Notify observers with some data
subject.notify('Hello Observers!');

// Unsubscribe one observer and notify again
subject.unsubscribe(observer1);
subject.notify('Another update!');


function flatten(arr) {
  if (typeof arr !== 'object') {
    return arr
  }

  let fl = [];
  for (let el of arr) {
    fl = fl.concat(flatten(el))
  }

  return fl;

}

// const arr1 = [1,[[1,2,1], 4,3,3], 2,3] 
// console.log(arr1)
// console.log(flatten(arr1))

String.prototype.isPalindrom = function() {
    console.log(this, this.toString());
    const aa = this.toString().split('').reverse().join('');
    return aa === this.toString();
}

console.log('cojoc'.isPalindrom())


