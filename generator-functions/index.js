/*
  Generator Functions
    - A constructed function
    - Pauses before every yield
    - Only executes a yield when .next() is called
    - You can yeild other generator functions with yield*
    - Always returns an obeject { value: returnedVal, done: boolean}
    - done becomes true after the last yield
    - After the last yeild return can be used but is still { value: returnedVal, done: }
 */

function* gen1(i) {
  console.log('In gen1()');
  yield i++; // 1
  yield i++; // 2
  yield* gen2(i); // 3
  console.log('In gen1()');
  yield 'Finished';
  return 'Hello';
}

function* gen2(i) {
  console.log('In gen2()');
  yield i++; // 3
  yield i++; // 4
}

let gen = gen1(1);

// In gen1()
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
// In gen1()
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: 4, done: false }
// In gen1()
console.log(gen.next()); // { value: 'Finished', done: false }
console.log(gen.next()); // { value: 'Hello', done: true }
console.log(gen.next()); // { value: undefined, done: true }
