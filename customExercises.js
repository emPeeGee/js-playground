"use strict";



// {
//   // TDZ starts at beginning of scope
//   const func = () => console.log(letVar); // OK

//   // Within the TDZ letVar access throws `ReferenceError`

//   let letVar = 3; // End of TDZ (for letVar)
//   func(); // Called outside TDZ!
  
//   {
//      function glFn ()  {
//       console.log('hell')
//     }
//   }
// }

// // console.log(null === undefined)
// // console.log(null == undefined)
// // console.log(null == false)
// // console.log(null === false)
// // console.log(1.03 + 8.04)


// const obj = {
//   namee: 'John',
//   greet: function() {
//     console.log(this.namee );
//   }
// };
// setTimeout(obj.greet, 100);  // Output: undefined


// function outer() {
//   let count = 0;
//   return function inner() {
//     count++;
//     return count;
//   };
// }
// const counter = outer();
// counter(); // 1
// counter(); // 2

// // glFn()

// function Animal(name) {
//   this.name = name;
// }

// Animal.prototype.speak = function() {
//   console.log(`${this.name} makes a sound`);
// };

// // const a = new Animal('na');
// // a.speak()


// // I think we can't discuss event loop in separation from the stack, so:

// // JS has three "stacks":

// // standard stack for all synchronous calls (one function calls another, etc)
// // microtask queue (or job queue or microtask stack) for all async operations with higher priority (process.nextTick, Promises, Object.observe, MutationObserver)
// // macrotask queue (or event queue, task queue, macrotask queue) for all async operations with lower priority (setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering)
// // |=======|
// // | macro |
// // | [...] |
// // |       |
// // |=======|
// // | micro |
// // | [...] |
// // |       |
// // |=======|
// // | stack |
// // | [...] |
// // |       |
// // |=======|
// // And event loop works this way:

// // execute everything from bottom to top from the stack, and ONLY when the stack is empty, check what is going on in queues above
// // check micro stack and execute everything there (if required) with help of stack, one micro-task after another until the microtask queue is empty or don't require any execution and ONLY then check the macro stack
// // check macro stack and execute everything there (if required) with help of the stack
// // Micro stack won't be touched if the stack isn't empty. The macro stack won't be touched if the micro stack isn't empty OR does not require any execution.

// // To sum up: microtask queue is almost the same as macrotask queue but those tasks (process.nextTick, Promises, Object.observe, MutationObserver) have higher priority than macrotasks.


// (function() {
//   // var b = 3;
//   // this.b = '3'
//   console.log('123');
// })();

// (() => {
//   console.log('123', this);
// })();


// const compose = (f, g) => x => f(g(x));
// const double = x => x * 2;
// const square = x => x * x;
// const addition = x => x + 10;
// // const doubleSquare = compose(square, double);
// const doubleSquare = compose(compose(square, double), addition);
// console.log(doubleSquare(3)); // 36


// // console.log(hoisted, typeof hoisted)
// var hoisted = 50;
// // console.log(hoisted, typeof hoisted)




// for (let i = 1; i < 10; i++) {
//   if (i % 3 === 0 && i % 5 === 0) {
//     console.log(i, 'foobar');
//     continue;
//   }
//   if (i % 3 === 0) {
//     console.log(i, 'foo')
//     continue;
//   }
//   if (i % 5 === 0) console.log(i, 'bar')
// }


// function isPalindrome(a, b) {
//   let revB = '';
//   for (let i = 0; i < b.length; i++) {
//     revB += b[i];
//   }

//   return a === revB;
// }

// function maxInArr(a) {
//   return Math.max(...a)
// }

// function maxInArr2(...a) {
//   return Math.max(...a)
// }

// console.log(isPalindrome('cec', 'cec'))
// console.log(isPalindrome('bec', 'cec'))
// console.log(maxInArr([1, 2, 3, 4]))
// console.log(maxInArr2(1, 2, 3, 4))

// console.log('===============')


// function flatten(arr) {
//   let r = [];
//   if (!Array.isArray(arr)) return arr;

//   for (let a of arr) {
//     if (Array.isArray(a)) {
//       r = r.concat(flatten(a));
//     } else {
//       r = r.concat(a)
//     }

//   }

//   return r

// }


// // console.log(flatten([[1, 2], [3, 4], [5, [6]]]))


// function firstNonRepeatingChar(str) {
//   let unique = true;
//   for (let i = 0; i < str.length; i++) {
//     for (let j = i + 1; j < str.length ; j++) {
//       if (str[i] === str[j]) {
//         unique = false;
//         break;
//       }

//     }

//     if (unique) {
//       return str[i]
//     }

//     unique = true
//   }

//   return null;
// }
// console.log('heyu')

// // console.log(firstNonRepeatingChar('u mam dus la magazin'))


// function customMap(arr, callback) {
//   const newArr = [];
//   for (let a of arr) {
//     newArr.push(callback(a))
//   }

//   return newArr;
// }


// console.log(customMap([1, 2, 3], (e) => e + 10))


// function debounce(callback, time) {

//   let timerId;
//   let calls = 0;
//   return () => {
//     calls++;
//     if (timerId) {
//       clearTimeout(timerId)
//     }

//     timerId = setTimeout(() => {
//       callback()
//       console.log(calls)
//     }, time)
//   }
// }

// const debouncer = debounce(() => console.log('hello'), 100);
// debouncer();
// debouncer();
// debouncer();
// debouncer();


// const abc1 = {
//   a: {
//     b: 2
//   }
// }


// const abc2 = {
//   a: {
//     b: 9
//   }
// }

// console.log(Object.assign(abc1, abc2))

// abc2.a.b = 10;
// console.log(abc1)


/*
// function isPalindrome(str) {
//   const reversedStr = str.split('').reverse().join('');
//   return str === reversedStr;
// }

// console.log(isPalindrome('cojoc'))
// console.log(isPalindrome('aaabaaa'))

// // cojoc 
// // 

// // array

// const arr = ['aba', 'not', 'cojoc', 'screen', 'visible'];
// const validPalindromes = arr.filter(isPalindrome);
// // const validPalindromes = arr.filter((item) => isPalindrome(item));

// // console.log(validPalindromes)

const str = 'fdsfasfdsfds fads fdsf dsf asdfsadsd';

function charsFrequency(s) {
  if (typeof s !== 'string') {
    throw new Error('input is not a string')
  }


  const freq = s.split('').reduce((acc, next) => {
     return { ...acc, [next]: acc[next] ? acc[next] + 1 : 1}
  }, {});

  return Object.entries(freq).reduce((acc, [key, value]) => {
     if (value >= acc[1]) {
       return [key, value]
     } 
     return acc;
  }, [null, -1])
}



console.log(charsFrequency(str))
// console.log(charsFrequency(str))
console.log(charsFrequency('Helloo'))

*/