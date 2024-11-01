const display = document.getElementById('display');

function appendNumber(number) {
    if (display.value === 'Error') display.value = number;
    else display.value += number;
}

function appendOperator(operator) {
    const lastCharacter = display.value.slice(-1);
    if (!isNaN(lastCharacter)) display.value += operator;
    else if (isNaN(lastCharacter) && lastCharacter !== operator) display.value = display.value.slice(0, -1) + operator;
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
    } catch {
        display.value = 'Error';
    }
}

function calculateSquareRoot() {
    const currentValue = parseFloat(display.value);
    if (currentValue >= 0) display.value = Math.sqrt(currentValue);
    else display.value = "Error";
}

window.addEventListener('keydown', function (e) {
    if (!isNaN(e.key)) appendNumber(e.key);
    else if (['+', '-', '*', '/', '.', '%'].includes(e.key)) appendOperator(e.key);
    else if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') deleteLast();
    else if (e.key === 'Escape') clearDisplay();
});
