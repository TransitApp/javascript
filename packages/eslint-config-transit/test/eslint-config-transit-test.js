'use strict';

// # Whitespace
// Limit your lines to 105 characters
function testMyStringLikeYouNeverTestedItBefore() {
  const string = 'The path of the righteous man is beset on all sides by the iniquities of the ' +
  'selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, ' +
  'shepherds the weak through the valley of darkness, for he is truly his brother\'s ' +
  'keeper and the finder of lost children. And I will strike down upon thee with great' +
  'vengeance and furious anger those who would attempt to poison and destroy My brothers.';

  return string;
}

testMyStringLikeYouNeverTestedItBefore();

// Use function before declaration
functionDefinedBeforeUse();

function functionDefinedBeforeUse() {

}

// Allowing to reassign parameter
function reassignParameter(value) {
  value.key = 42;
}

// Curly braces with if else
if (reassignParameter) {
  reassignParameter();
}
else {
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
