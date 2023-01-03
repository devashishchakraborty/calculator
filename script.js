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
    if (num2 == 0) {
        return "bruh";
    }
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

const operationArea = document.querySelector('#operation');
const solutionArea = document.querySelector("#solution");
const buttons = document.querySelectorAll('button')

let firstNumber = "";
let secondNumber = "";
let displayValue = "";
let operator = "";

buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        if (!displayValue.includes("=") && secondNumber.length > 0 && button.getAttribute('id') === 'equals') {
            solutionArea.textContent = operate(operator[0], parseFloat(firstNumber), parseFloat(secondNumber));
        }
        if (displayValue.includes("=")) {
            displayValue = firstNumber
        }
        displayValue += button.textContent;
        operationArea.textContent = displayValue;
        if (button.getAttribute('class') === 'number') {
            const digit = button.getAttribute('number');
            if (operator.length === 0) {
                firstNumber += digit;
            } else if (operator.length === 1) {
                secondNumber += digit;
            }
        }
        if (button.getAttribute('class') === 'operator') {
            operator += button.getAttribute('operator');
            if (operator.length === 2) {
                firstNumber = operate(operator[0], parseFloat(firstNumber), parseFloat(secondNumber));
                operator = operator.slice(1);
                solutionArea.textContent = firstNumber;
                secondNumber = "";
            }
        }
        if (button.getAttribute('class') === 'clear') {
            operationArea.textContent = "";
            solutionArea.textContent = "0";
            displayValue = "";
            firstNumber = "";
            secondNumber = "";
            operator = "";
        }
    })
});