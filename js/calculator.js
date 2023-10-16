//create js var for buttons and input/output
const numBtns = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const output = document.querySelector("#output");
const input = document.querySelector("#input");
const equalBtn = document.querySelector("#equal");

//create var for calculations and logic handling
let num1 = null;
let num2 = null;
let answer = null;
let newNum = true;
let operation = "";
let activeOperation = null;

//Add event listeners to number buttons and handle input logic
for (let i = 0; i < numBtns.length; i++) {
  numBtns[i].addEventListener("click", (e) => {
    if (e.target.id === "decimal" && input.innerHTML.includes(".") && !newNum) {
      return;
    } else if (newNum) {
      newNum = false;
      input.innerHTML = "";
      input.innerHTML = input.innerHTML + numBtns[i].innerHTML;
    } else {
      input.innerHTML = input.innerHTML + numBtns[i].innerHTML;
    }
    console.log(num1, num2, answer);
  });
}

//Add event listener to clear button and handle clear logic
clearBtn.addEventListener("click", (e) => {
  input.innerHTML = "";
  output.innerHTML = "";
  num1 = null;
  num2 = null;
  answer = null;
  operation = "";
  newNum = true;
  if (activeOperation != null) {
    activeOperation.classList.remove("active");
    activeOperation = null;
  }
});

//Add event listeners to operator buttons and handle operation logic
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", (e) => {
    if (isNaN(getNumber())) {
      if (num1 === null && num2 === null && answer != null) {
        num1 = answer;
        answer = null;
        operation = e.target.id;
      } else {
        console.log("NaN");
        return;
      }
    } else if (num1 === null) {
      num1 = getNumber();
      operation = e.target.id;
      console.log(e.target.id);
      e.target.classList.add("active");
      activeOperation = e.target;
      console.log(e.target.class);
      newNum = true;
    } else if (num2 === null && newNum === false) {
      num2 = getNumber();
      answer = calculate(num1, num2, operation);
      output.innerHTML = answer;
      num1 = answer;
      num2 = null;
      operation = e.target.id;
      newNum = true;
    }
    activeOperation.classList.remove("active");
    operation = e.target.id;
    e.target.classList.add("active");
    activeOperation = e.target;
    console.log(num1, num2, answer);
  });
}

//Add event listener to equal button and handle equal logic
equalBtn.addEventListener("click", (e) => {
  if (num1 === null && num2 === null) {
    console.log(getNumber());
    return;
  } else if (num1 != null && num2 === null && !isNaN(getNumber())) {
    num2 = getNumber();
    answer = calculate(num1, num2, operation);
    output.innerHTML = answer;
    input.innerHTML = "";
    num1 = null;
    num2 = null;
    newNum = true;
    activeOperation.classList.remove("active");

    activeOperation = null;
  } else {
    calculate(num1, num2, operation);
  }
  console.log(num1, num2, answer);
});

//Calcualtes value based on numbers and operation passed
function calculate(num1, num2, operation) {
  if (operation === "add") {
    return num1 + num2;
  } else if (operation === "subtract") {
    return num1 - num2;
  } else if (operation === "multiply") {
    return num1 * num2;
  } else if (operation === "divide") {
    return num1 / num2;
  }
}

//Gets number inputted by the user
function getNumber() {
  return parseFloat(input.innerHTML);
}
