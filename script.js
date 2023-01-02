function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2){
    switch (operator){
        case "+" : return add(num1, num2);
        break;

        case "-" : return subtract(num1, num2);
        break;

        case "*" : return multiply(num1, num2);
        break;

        case "/" : return divide(num1, num2);
        break;
    }
}

const displayArea = document.querySelector('.display-area');
const numberButtons = document.querySelectorAll('.number');
const clearButton = document.querySelector('#clear');
const operatorButtons = document.querySelectorAll('.operator')

let displayValue = "";
let operator = "";

numberButtons.forEach(function(number){
    number.addEventListener('click', function(event){
        if (displayValue.length < 16){
            displayValue = `${displayValue}` + `${number.getAttribute("number")}`;
            displayArea.textContent = displayValue;
        }
    })
});

clearButton.addEventListener('click', function(){
    displayValue = "";
    displayArea.textContent = "0";
});

operatorButtons.forEach(function(operation){

});