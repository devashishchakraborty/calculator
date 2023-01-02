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

const displayDiv = document.querySelector('.display-area');
const numbers = document.querySelectorAll('.number');
const clearButton = document.querySelector('#clear');

let displayValue = "";

numbers.forEach(function(number){
    number.addEventListener('click', function(event){
        if (displayValue.length < 16){
            displayValue = `${displayValue}` + `${number.textContent}`;
            displayDiv.textContent = displayValue;
        }
    })
});

clearButton.addEventListener('click', function(){
    displayValue = "";
    displayDiv.textContent = "0";
});