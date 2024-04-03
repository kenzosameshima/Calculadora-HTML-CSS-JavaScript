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
                const lastChar = display.textContent.slice(-1);
                const operators = ['+', '-', '*', '/'];

                // Verifica se o último caractere é um operador
                const lastCharIsOperator = operators.includes(lastChar);

                if (lastCharIsOperator && operator !== '-') {
                // Se o último caractere for um operador (exceto o operador de subtração), substitua-o pelo novo operador
                display.textContent = display.textContent.slice(0, -1) + operator;
                } else if (!lastCharIsOperator && display.textContent !== '') {
                // Se o último caractere não for um operador e a expressão não estiver vazia, adicione o novo operador
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
