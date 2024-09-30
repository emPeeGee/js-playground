/*

A Pangram is a sentence that contains all the letters of the alphabet.

You will be given a string i.
If i is an pangram, print Pangram.
If it is not, print all the letters not present in i, in alphabetical order, separated by a space.
If there are any special characters, just ignore them.

For example: if you get #sphinx_of_black_quartz?! the program should print d e g j m s v w y


Input
A string i
Output
Pangram if i is a pangram or [the remaining characters separated by spaces] if not.


abcdefghijklmnopqrstuvwxy => z

const str = readline();
const alphabet = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ));
const letters = new Map(alphabet.map(el => [el.toLowerCase(), 0]));
const freq = str.split('').reduce((acc, next) => {
    if (acc.has(next)) acc.set(next, acc.get(next) + 1)
    else acc.set(next,1)
    return acc
}, letters)

let res = [];
for (const [key, value] of freq)
    if (value === 0)
        res.push(key)

res = res.join(' ')
if (res === '') console.log('Pangram')
else console.log(res)

const str = readline();
const alphabet = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) );
const letters = new Map(alphabet.map(el => [el.toLowerCase(), 0]));
const a = str.split('').reduce((acc, next) => {
    if (acc.has(next)) {
        acc.set(next, acc.get(next) + 1)
    } else {
        acc.set(next,1)
    }

    return acc
}, letters)

let res = '';
for (const [key, value] of a) {
    if (value === 0) {
        res += key + ' ';
    }
}

if (res === '') {
    console.log('Pangram')
} else {
    console.log(res.trim())
}




// BEST
i=readline().toLowerCase()
console.log([..."abcdefghijklmnopqrstuvwxyz"].filter(v=>!i.includes(v)).join` `||"Pangram")
 */
