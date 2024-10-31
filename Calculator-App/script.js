
const display = document.getElementById('display');


function appendNumber(number) {
    if(display.value == 'Error')
        display.value = number;
    else
        display.value += number;
}


function appendOperator(operator) {
    var lastCharacter = display.value.slice(-1)
    if(!isNaN(lastCharacter)) //append the operator only if previously appended char is a number
        display.value += operator;
    else if(isNaN(lastCharacter) && lastCharacter!=operator) // if a new operator is selected, replace previous operator with new operator
        display.value = display.value.slice(0, -1) + operator;        
}


function clearDisplay() {
    display.value = '';
}


function deleteLast() {
    display.value = display.value.slice(0, -1);
}


function calculate() {
    try {
        display.value = eval(display.value); 
    } catch (error) {
        display.value = 'Error'; 
    }
}

//Squre Root of a number  ==> if the value is greater than or equal to 0 then do square root else if number is negative then display error.
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
