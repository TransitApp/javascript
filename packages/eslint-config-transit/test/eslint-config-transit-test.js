'use strict';

// Limit your lines to 120 characters
testMyStringLikeYouNeverTestedItBefore();

function testMyStringLikeYouNeverTestedItBefore() {
  const string = 'The path of the righteous man is beset on all sides by the iniquities of the selfish and the '
  + 'tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the '
  + 'valley of darkness, for he is truly his brother\'s keeper and the finder of lost children. And I will strike down '
  + 'upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers.';

  return string;
}

// Don't require the `radix` argument for `parseInt`.
// Both forms should be acceptable.
parseInt('10');
parseInt('10', 10);

// Use function before declaration
functionDefinedBeforeUse();

function functionDefinedBeforeUse() {
  // Quotes in object properties
  // If one property needs quotes, then we'll require quotes on any properties for the same object.
  const obj = {
    fooword: 'bar',
    otherfoo: 'bar2',
    foo: 'bar',
  };

  // If none of them require quotes, then quotes are disallowed.
  const anotherObject = {
    ...obj,
    'foo': 'bar',
    'foo2': 'bar2',
    'foo 3': 'bar3',
  };

  return anotherObject;
}

// Allowing to reassign parameter
function reassignParameter(value) {
  value.key = 42;
}

// Curly braces with if else
if (reassignParameter) {
  reassignParameter();
} else {
  functionDefinedBeforeUse();
}

// Trailing comma in function parameters should be ignored
// It's a ES2017 features and it's not available in any Node JS version.
function testMyTrailingComma(
  a,
  b
) {
  return a + b;
}

testMyTrailingComma();

// Allowing for...of loops.
for (const item of [() => {}, () => {}, () => {}]) {
  item();
}

// Allow continue
for (const item of [() => {}, () => 1, () => {}]) {
  if (item() === 1) {
    continue;
  }
}
