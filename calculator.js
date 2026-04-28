function appendToDisplay(value) {
    const display = document.getElementById('result');
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById('result');
    display.value = '';
}

function deleteLast() {
    const display = document.getElementById('result');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById('result');
    try {
        // Replace × with * for evaluation
        let expression = display.value.replace(/×/g, '*');
        let result = eval(expression);

        // Handle division by zero
        if (!isFinite(result)) {
            display.value = 'Error';
            return;
        }

        // Format result to avoid long decimal numbers
        if (result % 1 !== 0) {
            result = Math.round(result * 100000000) / 100000000;
        }

        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Allow keyboard input
document.addEventListener('keydown', function(event) {
    const display = document.getElementById('result');
    const key = event.key;

    // Allow numbers, operators, decimal point, and backspace
    if (/[\d+\-*/.]/.test(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
        event.preventDefault();

        if (key === 'Enter') {
            calculate();
        } else if (key === 'Escape') {
            clearDisplay();
        } else if (key === 'Backspace') {
            deleteLast();
        } else {
            appendToDisplay(key);
        }
    }
});