let currentInput = '0';
let operator = '';
let previousInput = '0';

function updateDisplay() {
    document.getElementById('screen').value = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || currentInput === 'Error') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function setOperator(op) {
    if (operator === '') {
        operator = op;
        previousInput = currentInput;
        currentInput = operator;
        updateDisplay();
    } else {
        calculate();
        operator = op;
        currentInput = operator;
        updateDisplay();
    }
}

function calculate() {
    if (operator === '/') {
        if (currentInput === '0') {
            currentInput = 'Error';
        } else {
            currentInput = (parseFloat(previousInput) / parseFloat(currentInput)).toString();
        }
    } else if (operator === '*') {
        currentInput = (parseFloat(previousInput) * parseFloat(currentInput)).toString();
    } else if (operator === '-') {
        currentInput = (parseFloat(previousInput) - parseFloat(currentInput)).toString();
    } else if (operator === '+') {
        currentInput = (parseFloat(previousInput) + parseFloat(currentInput)).toString();
    }

    operator = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    operator = '';
    previousInput = '0';
    updateDisplay();
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key) || key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        setOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        // Handle backspace key
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            currentInput = '0';
        }
        updateDisplay();
    } else if (key.toLowerCase() === 'c') {
        // Clear the display on pressing 'C'
        clearDisplay();
    } else if (key === '+/-' && currentInput !== '0' && currentInput !== 'Error') {
        // Toggle between positive and negative on pressing '+/-'
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
});