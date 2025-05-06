const { Observable, interval, of } = require("rxjs");
const {
  mergeMap,
  map,
  scan,
  distinctUntilChanged,
  catchError,
} = require("rxjs/operators");

const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;

let addInterval;

const stream$ = new Observable((observer) => {
  addInterval = observer.next.bind(observer);
});

stream$
  .pipe(
    mergeMap((ms, i) =>
      interval(ms).pipe(
        map(() => {
          const randomInt = Math.floor(Math.random() * 10);

          if (randomInt === 9) {
            throw new Error(`Errored with 9`);
          }

          return { i, randomInt };
        }),
        catchError((err) => {
          console.error(red(`Caught error in stream ${i}: ${err.message}`));
          return of({ i, randomInt: "x" });
        }),
        distinctUntilChanged((prev, curr) => prev.randomInt === curr.randomInt),
      ),
    ),
    scan((acc, { i, randomInt }) => {
      acc[i] = randomInt;
      return { ...acc };
    }, {}),
    map((acc) => Object.values(acc).join(" ")),
  )
  .subscribe({
    next: (result) => console.log(green(result)),
  });

// Emulate user input
const randomIntGeneratorInterval = setInterval(() => {
  const ms = Math.floor(100 + Math.random() * 1900);
  addInterval(ms);
}, 3000);

// setTimeout(() => {
//   clearInterval(randomIntGeneratorInterval);
// }, 5000);
