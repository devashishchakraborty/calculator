function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+": return add(num1, num2);
            break;

        case "-": return subtract(num1, num2);
            break;

        case "*": return multiply(num1, num2);
            break;

        case "/": return divide(num1, num2);
            break;
    }
}

const displayArea = document.querySelector('.display-area');
const numberButtons = document.querySelectorAll('.number');
const clearButton = document.querySelector('#clear');
const operatorButtons = document.querySelectorAll('.operator')

let firstNumber = "";
let secondNumber = "";
let operator = "";
let displayText = "";

numberButtons.forEach(function (number) {
    number.addEventListener('click', function () {
        const currentNumber = number.getAttribute("number");

        if (firstNumber.length < 16 && operator.length === 0
            && !(firstNumber.includes(".") && currentNumber === ".")) {
            firstNumber = `${firstNumber}` + `${currentNumber}`;
            displayText = `${displayText}` + `${currentNumber}`;
        }

        if (secondNumber.length < 16 && operator.length === 1
            && !(secondNumber.includes(".") && currentNumber === ".")) {
            secondNumber = `${secondNumber}` + `${currentNumber}`;
            displayText = `${displayText}` + `${currentNumber}`;
        }
        displayArea.textContent = displayText;
    })
});

clearButton.addEventListener('click', function () {
    displayText = "";
    displayArea.textContent = "0";
    operator = "";
    firstNumber = "";
    secondNumber = "";
});

operatorButtons.forEach(function (operation) {
    operation.addEventListener('click', function () {
        if (operator.length === 0) {
            operator = operation.getAttribute("operator");
            displayText = `${displayText}` + `${operation.textContent}`;
            displayArea.textContent = displayText;
        }
    });
});