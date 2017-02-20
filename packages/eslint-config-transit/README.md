# eslint-config-transit

This package provides Transit's JS linting rules as an extensible shared config.

## Installation
```
npm i --save-dev eslint eslint-plugin-import eslint-config-transit
```

## Usage
To get started, extend Transit's config in your linter configuration.

```json
{
  "extends": "transit"
}
```

From this point, you should be able to start linting your code:

```
./node_modules/.bin/eslint .
```

## The rules
They can be found in the [Transit's javascript style guide](https://github.com/TransitApp/javascript).
