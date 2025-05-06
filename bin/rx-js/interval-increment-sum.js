const {
  interval,
  filter,
  combineLatest,
  map,
  auditTime,
  scan,
  takeUntil,
  timer,
} = require("rxjs");

/**
 * @example
 *  ----- Stream Flow ------------------
 *  Odd:   -----1-----3-----5-----7---->
 *  Even:  ----0---------2---------4--->
 *
 *  ----- combineLatest Output ---------
 *  Log:   -----!---------5---------11->
 *
 *  combineLatest pipe begins here (!)
 */
const oddSource$ = interval(300).pipe(filter((count) => count % 2 !== 0));
const evenSource$ = interval(500).pipe(filter((count) => count % 2 === 0));

/**
 * @example
 *
 * private stop$ = new Subject<void>();
 *
 * private stop(): void {
 *   this.stop$.next();
 *   this.stop$.complete();
 * }
 */
const stopSource$ = timer(10000);

combineLatest([oddSource$, evenSource$])
  .pipe(
    map(([odd, even]) => odd + even),
    auditTime(1000),
    scan((acc, value) => [...acc, value], []),

    takeUntil(stopSource$),
  )
  .subscribe((result) =>
    console.log({ lastSum: result[result.length - 1], sumHistory: result }),
  );
