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

function exponent(num1, num2){
    return num1 ** num2;
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
        
        case "^": return exponent(num1, num2);
            break;
    }
}

function appendNumber(event) {
    if (displayValue.length < 16) {
        if (event.type === "keydown"){
            if (displayValue[0] === "0" && displayValue.length === 1 && event.key === "0"){
                displayValue += "";
            }
            else displayValue += event.key;
        }
        else {
            if (displayValue[0] === "0" && displayValue.length === 1 && event.target.getAttribute('value') === "0"){
                displayValue += "";
            }
            else displayValue += event.target.getAttribute('value');
        }

        displayArea2.textContent = displayValue;
    }

}

function appendOperator(event) {
    if (displayValue.length > 0) { // wont insert operator if no number is present in displayArea2
        if (operation.length === 0) {
            firstNumber = displayValue;
            displayValue = "";
        } else {
            secondNumber = displayValue;
            displayValue = "";
            firstNumber = Math.round(operate(operation, parseFloat(firstNumber), parseFloat(secondNumber)) * 100) / 100;
        }
    }

    if (event.type === "keydown") {
        // pressing keyboard * and / keys will display the normal multiplicaltion and division symbols.
        if (event.key === "*") operation = "×"
        else if (event.key === "/") operation = "÷"
        else operation = event.key;
    }
    else operation = event.target.getAttribute("value");

    // Won't insert operator in displayArea1 if no number is present
    if (displayArea1.textContent.length === 0 && firstNumber.length === 0) {
        operation = "";
    }

    displayArea1.textContent = firstNumber + operation;
    displayArea2.textContent = displayValue;
}

function appendDecimal(event) {
    if (!displayValue.includes(".")) { // doesn't allow multiple decimal points in a single number

        if (event.type === "keydown") displayValue += event.key;
        else displayValue += event.target.getAttribute("value");

        displayArea2.textContent = displayValue;
    }
}

function equalToPressed() {
    equalTo = true;
    // No calculation occurs if only one number is present.
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

function backspacePressed() {
    displayValue = displayValue.slice(0, -1);
    displayArea2.textContent = displayValue;
}

function clearScreen() {
    displayValue = "";
    firstNumber = "";
    secondNumber = "";
    operation = "";
    displayArea1.textContent = "";
    displayArea2.textContent = "";
    equalTo = false;
}

function toggleNegative(){
    if (displayValue.length > 0){
        displayValue = (+displayValue * -1).toString(); 
        displayArea2.textContent = displayValue;
    }
}

const displayArea1 = document.querySelector(".display-up")
const displayArea2 = document.querySelector('.display-down');
const buttons = document.querySelectorAll('.btn')

let firstNumber = "";
let secondNumber = "";
let displayValue = "";
let operation = "";
let equalTo = false;

// Base calculator
buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        
        if (!equalTo) { // Will Only run the condition if equal to button is not pressed

            if (event.target.getAttribute("button-type") === "number") appendNumber(event);

            if (event.target.getAttribute("button-type") === "operator") appendOperator(event);

            if (event.target.getAttribute("button-type") === "decimal") appendDecimal(event);

            if (event.target.getAttribute("button-type") === "equalTo") equalToPressed();

            if (event.target.getAttribute("button-type") === "backspace") backspacePressed();

            if (event.target.getAttribute("button-type") === "negative-toggle") toggleNegative();
        }
        if (event.target.getAttribute("button-type") === "clear") clearScreen(); // clears everything and reset
    })
});

// Keyboard support for calculator
document.addEventListener("keydown", function (event) {
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(event.key)) appendNumber(event);
    if (["+", "-", "*", "/"].includes(event.key)) appendOperator(event);
    if (event.key === ".") appendDecimal(event);
    if (event.key === "=") equalToPressed();
    if (event.key === "Backspace") backspacePressed();
    if (event.key === " ") clearScreen();
})