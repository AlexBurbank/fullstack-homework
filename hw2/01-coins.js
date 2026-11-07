/** Exercise 01 - Coins **/

const createResult = function CreateResult(
  amount,
  dollars,
  quarters,
  dimes,
  nickels,
  pennies,
) {
  dollars = Number.parseInt(dollars);
  quarters = Number.parseInt(quarters);
  dimes = Number.parseInt(dimes);
  nickels = Number.parseInt(nickels);
  pennies = Number.parseInt(pennies);

  if (
    Number.isNaN(dollars) ||
    Number.isNaN(quarters) ||
    Number.isNaN(dimes) ||
    Number.isNaN(nickels) ||
    Number.isNaN(pennies)
  ) {
    return;
  }

  let result = `$${amount} ==>`;

  result = `${result} ${dollars} `;
  if (dollars === 1) {
    result = `${result}dollar`;
  } else {
    result = `${result}dollars`;
  }

  result = `${result}, ${quarters} `;
  if (quarters === 1) {
    result = `${result}quarter`;
  } else {
    result = `${result}quarters`;
  }

  result = `${result}, ${dimes} `;
  if (dimes === 1) {
    result = `${result}dime`;
  } else {
    result = `${result}dimes`;
  }

  result = `${result}, ${nickels} `;
  if (nickels === 1) {
    result = `${result}nickle`;
  } else {
    result = `${result}nickles`;
  }

  result = `${result}, and ${pennies} `;
  if (pennies === 1) {
    result = `${result}penny`;
  } else {
    result = `${result}pennies`;
  }

  return result;
};

// Add your function here
const calculateChange = function CalculateChange(amount) {
  const numericalAmount = Number.parseFloat(amount);

  if (Number.isNaN(numericalAmount)) {
    return `${amount} ==> Error: amount passed in is not a number`; // numericalAmount is NaN so that would not help anybody
  }

  if (numericalAmount < 0) {
    return `$${numericalAmount} ==> Error: the number cannot be negative`;
  }

  if (numericalAmount > 100) {
    return `$${numericalAmount} ==> Error: the number is too large`;
  }

  const dollarAmount = Number.parseInt(numericalAmount);
  let change = amount - dollarAmount;
  change = change * 1000; // * 1000 instead of 100 because if there is an extra digit, the number provided had at least 3 digits after the decimal point

  change = Number.parseInt(change);

  if (change % 10 !== 0) {
    return `${numericalAmount} ==> Error: can only have 2 digits after the decimal point`;
  }

  change = change / 10; // At this point, change has an extra 0 that is not needed

  const numQuarters = Number.parseInt(change / 25);

  change = change % 25;

  const numDimes = Number.parseInt(change / 10);

  change = change % 10;

  const numNickles = Number.parseInt(change / 5);

  change = change % 5;

  const numPennies = change / 1; // For the sake of consistency

  return createResult(
    amount,
    dollarAmount,
    numQuarters,
    numDimes,
    numNickles,
    numPennies,
  );
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11)); // TODO: Need to have some condition for this error
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log("\n================Error cases================");
console.log(calculateChange(-1));
console.log(calculateChange("some"));
console.log(calculateChange("4.62"));
console.log(calculateChange(4.627));
