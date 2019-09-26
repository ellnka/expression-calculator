function eval() {
  // Do not use eval!!!
  return;
}


function expressionCalculator(expr) {
  
  const OPERATORS = ["+", "-", "/", "*"];
  const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const END_OF_EXPR = ")";
  const START_OF_EXPR = "(";

  if (expr.split(START_OF_EXPR).join("").length !== expr.split(END_OF_EXPR).join("").length) {
    throw "ExpressionError: Brackets must be paired";
  }

  let arr = expr.split("");
  let stackValues = [];
  let stackOperators = [];
  let number = "";

  for (let i = 0; i < arr.length; i++) {
    const isNumber = NUMBERS.includes(arr[i]);

    if (isNumber) {
      number += arr[i];
    }
    if (number !== "" && (!isNumber || (isNumber && i === arr.length - 1))) {
      stackValues.push(Number(number));
      number = "";
    }

    if (OPERATORS.includes(arr[i])) {
      while (
        stackOperators.length &&
        isPreceded(arr[i], stackOperators[stackOperators.length - 1])
      ) {
        stackValues.push(calculate(stackOperators.pop(), stackValues.pop(), stackValues.pop()));
      }
      stackOperators.push(arr[i]);
    }

    if (arr[i] === START_OF_EXPR) {
      stackOperators.push(arr[i]);
    }

    if (arr[i] === END_OF_EXPR) {
      while (stackOperators[stackOperators.length - 1] !== START_OF_EXPR) {
        stackValues.push(calculate(stackOperators.pop(), stackValues.pop(), stackValues.pop()));
      }
      stackOperators.pop();
    }

  }

  while (stackOperators.length) {
      stackValues.push(calculate(stackOperators.pop(), stackValues.pop(), stackValues.pop()));
  }

  return stackValues.pop();
}

function calculate(operator, b, a) {
  //console.log("calculate: " + a + operator + b);
  if (a === undefined || b === undefined) return 0;

  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b !== 0) return a / b;
      else throw "TypeError: Devision by zero.";
  }
  return 0;
}

function isPreceded(operator1, operator2) {
  if ("()".includes(operator2)) return false;
  if ("/*".includes(operator1) && "+-".includes(operator2)) return false;

  return true;
}

//console.log(expressionCalculator("((1 + 2) * 3"));

module.exports = {
  expressionCalculator
};
