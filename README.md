# Writing Javascript at Transit
_Javascript style guide we use at [Transit](https://transitapp.com/)._

## Content
- [Airbnb Javascript style guide](#airbnb-javascript-style-guide)
- [Exceptions](#exceptions)
- [Naming conventions](#naming-conventions)
- [ES2015 and beyond](#es2015-and-beyond)

## Airbnb Javascript style guide
Our styles are based on the excellent [javascript guide from Airbnb](https://github.com/airbnb/javascript) with a few exceptions.

## Exceptions

### Whitespace
- Limit your lines to 120 characters. eslint: [max-len](http://eslint.org/docs/rules/max-len).
 > This ensures readability and maintainability.

  ```javascript
  // Bad.
  const promise = Promise.resolve(true).then(Promise.resolve).then(Promise.resolve).then(Promise.resolve).then(Promise.resolve);

  // Good.
  const promise = Promise.resolve()
    .then(Promise.resolve)
    .then(Promise.resolve)
    .then(Promise.resolve)
    .then(Promise.resolve);
  ```

### Functions
- Allow usage before declaration. eslint: [no-use-before-define](http://eslint.org/docs/rules/no-use-before-define)

  ```javascript
  doSomething();

  function doSomething() {}
  ```

## Naming conventions
### Consistency and disambiguation

As soon as a concept has a name, this name should always be used to refer to that concept, and that
name shouldn't be used to refer to anything else.

Example:
- A `globalRouteId` is a unique identifier to a route. One should never call it `routeId` since it
 is another concept (used in the GTFS, the tGTFS and the bgtfs with different meaning).
- A `feed` is an instance of the `transit_production.feeds` table. An `alertFeed` is an instance of
 the `service_update.alert_feeds` table.

Example:
If some external tools/library/api uses the same name for another concept, then at least the
foreign name should be prefixed for disambiguation, or even both.

- When we match the stops from the GTFS to the stop from some real-time API, we call the first one
 `gtfsStop` and the second one `apiStop` even if the first one is usually just called stop.


### The name should describe the content

- An array should have a name that gives clues about its content.
  ```javascript
  // Bad.
  const things = ['dog', 'cat', 'mouse'];

  // Good.
  const animals = ['dog', 'cat', 'mouse'];
  ```

- An object of `thing` indexed by some `key` should be called `thingByKey`.
  ```javascript
  // Bad.
  const routes = {
    2: {
      routeShortName: 'R1',
      routeLongName: 'Awesome Route 1'
    },
  };

  // Good.
  const routeByGlobalRouteId = {
    2: {
      routeShortName: 'R1',
      routeLongName: 'Awesome Route 1'
    },
  };
  ```

- When you have different representations of the _same_ thing, apply some disambiguation on the content.
  ```javascript
  // Bad.
  let date = '2017-01-01 00:00:00';
  date = moment(date, 'YYYY-MM-DD HH:mm:ss');

  // Good.
  const dateAsString = '2017-01-01 00:00:00';
  const dateAsMoment = moment(dateAsString, 'YYYY-MM-DD HH:mm:ss');
  ```

  ```javascript
  // Bad.
  let stopSequence = '1';
  stopSequence = parseInt(stopSequence);

  // Good.
  const stopSequenceAsString = '1';
  const stopSequenceAsInt = parseInt(stopSequenceAsString);
  ```

With some reasonable limits, one shouldn't be afraid to have long variable name, and be more afraid
 of meaningless names. For example:
- `apiStopByStopIdByTripHeadsignByRouteId` should be still preferred as `dict` or `apiStops`.

## ES2015 and beyond
Below are features that are recommended to start using. Although, keep in mind that they are closely related to node versions, so please [double check](http://node.green) if a feature is available before starting using it.

### Promises
Dealing with asynchronous code can be tricky sometimes. To simplify and improve readability, one must try using Promises instead of the classic error-first callback. Here are a few links to understand them and start using them efficiently.

- [Promises vs callbacks](promises.md)
- [Manage your async control flow](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch4.md#chapter-4-async-flow-control)

### Async/Await
Async/await is part of the ES2017 release. Node 7.6 ships with [V8 5.5](https://v8project.blogspot.ca/2016/10/v8-release-55.html), which includes `async/await` natively. So it's time to start use it. Although, one must completely understand how Promises work because both features work together.

- [Getting started with async/await](https://medium.freecodecamp.com/getting-started-with-async-await-b66385983875#.qxl22gdiv)
- [Understanding Promises before using async/await](https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8#.39oi14ego)
