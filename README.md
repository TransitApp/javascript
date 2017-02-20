# Writing Javascript at Transit
_Javascript style guide we use at [Transit](https://transitapp.com/)._

## Content
- [Airbnb Javascript style guide](#airbnb-javascript-style-guide)
- [Exceptions](#exceptions)

## Airbnb Javascript style guide
Our styles are based on the excellent [javascript guide from Airbnb](https://github.com/airbnb/javascript) with a few exceptions.

## Exceptions

### Whitespace
- Limit your lines to 105 characters. eslint: [max-len](http://eslint.org/docs/rules/max-len).
> This ensures readability and maintainability.

```javascript
// Bad.
const promise = Promise.resolve(true).then(Promise.resolve).then(Promise.resolve).then(Promise.resolve).then(Promise.resolve);

// Good
const promise = Promise.resolve()
  .then(Promise.resolve)
  .then(Promise.resolve)
  .then(Promise.resolve)
  .then(Promise.resolve);
```

## Naming conventions
For sure, there are things we'd like to add here.
