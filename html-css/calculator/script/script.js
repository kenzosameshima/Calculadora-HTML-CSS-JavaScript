const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
const themeToggleBtn = document.querySelector('.theme-toggler');
const calculator = document.querySelector('.calculator');
let lastResult = '';
let openedParentheses = 0;
let closedParentheses = 0;

buttons.forEach((item) => {
    item.addEventListener('click', () => {
        const operator = item.dataset.operator;
        if (operator) {
            if (operator === 'clear') {
                display.textContent = '';
                lastResult = '';
                openedParentheses = 0;
                closedParentheses = 0;
            } else if (operator === '=') {
                try {
                    let result = eval(display.textContent);
                    if (result % 1 !== 0) {
                        result = parseFloat(result.toFixed(14)); 
                    }
                    display.textContent = result;
                    lastResult = result;
                } catch (error) {
                    display.textContent = 'Error';
                }
            } else if (operator === 'sqrt') {
                let result = Math.sqrt(parseFloat(display.textContent));
                if (result % 1 !== 0) {
                    result = parseFloat(result.toFixed(14)); 
                }
                display.textContent = result;
                lastResult = result;
            } else if (operator === '()') {
                if (openedParentheses === closedParentheses) {
                    display.textContent += '(';
                    openedParentheses++;
                } else if (openedParentheses > closedParentheses) {
                    display.textContent += ')';
                    closedParentheses++;
                }
            } else {
                if (display.textContent.length < 14) {
                    display.textContent += operator;
                }
            }
        } else {
            if (display.textContent.length < 14) {
                display.textContent += item.textContent;
            }
        }
    });
});

themeToggleBtn.addEventListener('click', () => {
    calculator.classList.toggle('dark');
    themeToggleBtn.classList.toggle('active');
});
