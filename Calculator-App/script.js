
const display = document.getElementById('display');


function appendNumber(number) {
    if(display.value == 'Error')
        display.value = number;
    else
        display.value += number;
}
let decimalDigit = 0;

function appendOperator(operator) {
    const lastCharacter = display.value.slice(-1);

    // Check if the operator is a decimal point
    if (operator==='.') {
        // If we already have a decimal, do not allow another
        if (decimalDigit>=1) {
            return;
        } else {
            decimalDigit += 1;
        }
    }

    if (!isNaN(lastCharacter)) {
        display.value += operator;
    } else if (isNaN(lastCharacter) && lastCharacter !== operator) {
        // If a new operator is selected, replace the previous operator with the new operator
        display.value = display.value.slice(0, -1) + operator;
    }
}

// Reset the decimalDigit when a new number starts
function resetDecimal() {
    decimalDigit = 0; // Reset the decimal count
}

function clearDisplay() {
    decimalDigit=0;
    display.value = '';
}


function deleteLast() {
    display.value = display.value.slice(0, -1);
}


function calculate() {
    try {
        let result = eval(display.value);

        // Check if the result is a whole number
        if (Number.isInteger(result)) {
            display.value = result; // Display as is
        } else {
            // Round to 2 decimal places for non-integers
            display.value = parseFloat(result).toFixed(2);
        }
    } catch (error) {
        display.value = 'Error'; 
    }
}



function calculateSquareRoot() {
    const currentValue = parseFloat(display.value);
    if (currentValue >= 0) {
        display.value = Math.sqrt(currentValue);
    } else {
        display.value = "Error";
    }
}


window.addEventListener('keydown', function(e) {
    if (!isNaN(e.key)) {
        appendNumber(e.key); 
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '.' || e.key === '%') {
        appendOperator(e.key);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        calculate(); 
    } else if (e.key === 'Backspace') {
        deleteLast(); 
    } else if (e.key === 'Escape') {
        clearDisplay(); 
    }
});
