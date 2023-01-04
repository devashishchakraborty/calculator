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

function appendNumber(event) {
    displayValue += event.target.getAttribute('value');
    displayArea2.textContent = displayValue;
}

function appendOperator(event){
    if (displayValue.length > 0) {
        if (operation.length === 0) {
            firstNumber = displayValue;
            displayValue = "";
        } else {
            secondNumber = displayValue;
            displayValue = "";
            firstNumber = Math.round(operate(operation, parseFloat(firstNumber), parseFloat(secondNumber)) * 100) / 100;
        }
    }
    operation = event.target.getAttribute("value");
    if (displayArea1.textContent.length === 0 && firstNumber.length === 0) {
        operation = "";
    }
    displayArea1.textContent = firstNumber + operation;
    displayArea2.textContent = displayValue;
}

function appendDecimal(event){
    if (!displayValue.includes(".")) {
        displayValue += event.target.getAttribute("value");
        displayArea2.textContent = displayValue;
    }
}

function equalToPressed(){
    equalTo = true;
    if (firstNumber.length === 0) {
        displayArea2.textContent = "=" + displayValue;
    } else if (displayValue.length === 0) {
        displayArea2.textContent = "=" + firstNumber;
    } else {
        secondNumber = displayValue;
        firstNumber = Math.round(operate(operation, parseFloat(firstNumber), parseFloat(secondNumber)) * 100) / 100;
        displayArea1.textContent = "";
        displayArea2.textContent = "=" + firstNumber;
    }
}

function backspacePressed(){
    displayValue = displayValue.slice(0, -1);
    displayArea2.textContent = displayValue;
}

function clearScreen(){
    displayValue = "";
    firstNumber = "";
    secondNumber = "";
    operation = "";
    displayArea1.textContent = "";
    displayArea2.textContent = "";
    equalTo = false;
}

const displayArea1 = document.querySelector(".display-up")
const displayArea2 = document.querySelector('.display-down');
const buttons = document.querySelectorAll('.btn')

let firstNumber = "";
let secondNumber = "";
let displayValue = "";
let operation = "";
let equalTo = false;

buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {

        if (!equalTo) {
            if (event.target.getAttribute("button-type") === "number") appendNumber(event);

            if (event.target.getAttribute("button-type") === "operator") appendOperator(event);

            if (event.target.getAttribute("button-type") === "decimal") appendDecimal(event);

            if (event.target.getAttribute("button-type") === "equalTo") equalToPressed();

            if (event.target.getAttribute("button-type") === "backspace") backspacePressed();
        }
        if (event.target.getAttribute("button-type") === "clear") clearScreen();
    })
});