# Writing Javascript at Transit
_Javascript style guide we use at [Transit](https://transitapp.com/)._

## Content
- [Airbnb Javascript style guide](#airbnb-javascript-style-guide)
- [Exceptions](#exceptions)

## Airbnb Javascript style guide
Our styles are based on the excellent [javascript guide from Airbnb](https://github.com/airbnb/javascript) with a few exceptions.

## Exceptions

### Whitespace
- Limit your lines to 100 characters (with a 5 characters tolerance). eslint: [max-len](http://eslint.org/docs/rules/max-len).
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

- An array of `thing` should be called just `things`.
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

As soon as you start to have different representations of the same thing in the same function, 
disambiguation on the content should be done. For example:
- `timestampAsMoment` vs `timestampAsString`
- `stopSequenceAsString` vs `stopSequenceAsInt`

With some reasonable limits, one shouldn't be afraid to have long variable name, and be more afraid
 of meaningless names. For example:
- `apiStopByStopIdByTripHeadsignByRouteId` should be still preferred as `dict` or `apiStops`.
