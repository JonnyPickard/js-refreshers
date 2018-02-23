/*
  Promises
    - Create a proxy object with the values: pending, resolved, rejected
    - .then returns the value on completion (this can be another promise)
    - reject throws and can be caught
    - resolve succesfully completes
 */

const fetch = require('node-fetch');

// Function that returns a promise that...
// Get requests localhost which returns the path
// or shuts down the server
let promiseFetch = path =>
  new Promise((resolve, reject) => {
    fetch(`${process.env.apiUrl}/${path}`)
      .then(res => res.text())
      .then(body => resolve(body))
      .catch(reject);
  });

// Create <pending> promises
let promiseFetchA = promiseFetch('a');
let promiseFetchB = promiseFetch('b');
let promiseFetchC = promiseFetch('c');
let promiseFetchD = promiseFetch('d');
let promiseKillServer = promiseFetch('kill-server');

// .all
let promiseAll = Promise.all([
  promiseFetchA,
  promiseFetchB,
  promiseFetchC,
  promiseFetchD
]);

// .race
let promiseRace = Promise.race([
  promiseFetchA,
  promiseFetchB,
  promiseFetchC,
  promiseFetchD
]);

// Classic promise execution chain
promiseAll
  .then(value => {
    console.log('All:', value);
    promiseRace.then(value => {
      console.log('Race:', value);
      asyncPromises();
    });
  })
  .catch(err => console.error('Classic Promise Chain:', err));

// Async await chaining
const asyncPromises = async () => {
  try {
    let value = await promiseAll;
    console.log('All:', value);
    value = await promiseRace;
    console.log('Race:', value);
    value = await promiseKillServer;
    console.log('KillServer:', value);
  } catch (err) {
    console.error('Async Await Promise Chain:', err);
  }
};
