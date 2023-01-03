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

        case "×": return multiply(num1, num2);
            break;

        case "÷": return divide(num1, num2);
            break;
    }
}

const operationArea = document.querySelector('.display-area');
const buttons = document.querySelectorAll('.btn')

let firstNumber = "";
let secondNumber = "";
let displayValue = "";
let operation = "";

buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {

        if (event.target.getAttribute("button-type") === "number") {
            displayValue += event.target.getAttribute('value');
        }

        if (event.target.getAttribute("button-type") === "operator") {
            if (+displayValue.slice(-1)) {
                if (event.target.getAttribute("value") === "=" && operation.length !== 0) {
                    secondNumber = displayValue.split(operation).filter(Boolean).slice(-1);
                    displayValue = Math.round(operate(operation, parseFloat(firstNumber), parseFloat(secondNumber)) * 100) / 100;
                } else {
                    if (operation.length === 1) {
                        secondNumber = displayValue.split(operation).filter(Boolean).slice(-1);
                        displayValue = Math.round(operate(operation, parseFloat(firstNumber), parseFloat(secondNumber)) * 100) / 100;
                        firstNumber = displayValue;
                        displayValue += event.target.getAttribute("value");
                    } else {
                        firstNumber = displayValue;
                        displayValue += event.target.getAttribute("value");
                    }
                    operation = event.target.getAttribute("value");
                }
            }
        }

        if (event.target.getAttribute("button-type") === "clear") {
            displayValue = "";
            firstNumber = "";
            secondNumber = "";
            operation = "";
        }
        operationArea.textContent = displayValue;
    })
});