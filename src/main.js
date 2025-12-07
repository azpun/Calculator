import './style.css'


const displayText = document.querySelector('#display'); // querySelector to select element with id display
const resultDisplay = document.querySelector('#result'); // querySelector to select element with id result
const fullDisplay = document.querySelector('#fullDisplay');
const numButtons = document.querySelectorAll('.btn-num'); // querySelectorAll to select all elements with class btn-num
const opButtons = document.querySelectorAll('.btn-op');
const btnPreview = document.querySelectorAll('.buttonPreview');
const btnClear = document.getElementById('btn-clear');
const btnBackspace = document.getElementById('btn-backspace');
const btnEqual = document.getElementById('btn-result');

let tokens = []; // to store numbers and operators as tokens
let preview = [];


// event and function button clear
btnClear.addEventListener('click', () => {
    displayText.textContent = '0'; // reset display text to 0
    fullDisplay.textContent = '0';
    resultDisplay.textContent = ''; // reset result display to empty
    tokens = [];
});

// event and function to delete/backspace for display text and full display
btnBackspace.addEventListener('click', () => {
    displayText.textContent = displayText.textContent.slice(0, -1); // remove the last character from display text
    if (displayText.textContent === '') { // if display text is empty, set it to 0
        displayText.textContent = '0';
    }
    // why displayText.textContent can use slice method? because displayText.textContent is a string, and string has slice method.
});

// event and function for number buttons 0-9
// using forEach because numButton used querySelectorAll which returns a node list
// node list is similar to an array, so we can use forEach to loop through each button
numButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.dataset.num; // dataset.num to get the value of data-num attribute from the button
        if (displayText.textContent === '0') { // if display text is 0, replace it with the clicked number
            displayText.textContent = value;
        } else { // else, append the clicked number to the display text
            displayText.textContent += value;
        };
    })
});

// event and function for operator buttons + - * /, using forEach because opButton used querySelectorAll which returns a node list
// node list is similar to an array, so we can use forEach to loop through each button
opButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.dataset.op; // dataset.op to get the value of data-op attribute from the button
        tokens.push(displayText.textContent); // push the current display text (number) to tokens array
        tokens.push(value); // push the clicked operator to tokens array
        displayText.textContent = '0'; // reset display text to 0 for the next number input
        // console.log(tokens);
    })
})

btnPreview.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.dataset.num;
        if (fullDisplay.textContent === '0') { // if display text is 0, replace it with the clicked number
            fullDisplay.textContent = value;
        } else { // else, append the clicked number to the display text
            fullDisplay.textContent += value;
        };
    })
})

// Shunting Yard Algorithm, to convert infix expression to postfix expression
// Parshing, not tokenizing, because tokenizing is splitting string into tokens, while parsing is analyzing the structure of the expression
function parseInfixToPosfix(tokens) { // tokens is an array of numbers and operators in infix notation
    const outputPost = []; // to store the output postfix expression
    const opStack = []; // to store operators temporarily
    
    const orderToDo = {'+':1, '-':1, '*':2, '/':2}; // operator precedence

    for(let token of tokens){ // loop through each token in the tokens array
        if(!isNaN(token)){ // if the token is a number (not NaN)
            outputPost.push(token); // push the number to outputPost array
        } else if (token in orderToDo){ // if the token is an operator
            while ( // while there are operators in the stack with higher or equal precedence
                opStack.length && // check if there are operators in the stack
                orderToDo[opStack[opStack.length - 1]] >= orderToDo[token] // check the precedence of the operator at the top of the stack
            ){
                outputPost.push(opStack.pop()); // pop the operator from the stack and push it to outputPost array
            }
            opStack.push(token); // push the current operator to the stack
        }
    }

    while(opStack.length) { // after processing all tokens, pop all remaining operators from the stack
        outputPost.push(opStack.pop()); // and push them to outputPost array
    }
    return outputPost; // return the outputPost array which contains the postfix expression
}

// Evaluate Postfix Expression
function evaluatePostFix(postFix) { // postFix is an array of numbers and operators in postfix notation
    const opStack = []; // to store numbers temporarily

    for (let token of postFix){ // loop through each token in the postFix array
        if (!isNaN(token)) { // if the token is a number (not NaN)
            opStack.push(parseFloat(token)); // push the number to opStack array, parseFloat to convert string to number
        } else { // if the token is an operator
            const b = opStack.pop(); // pop the top two numbers from the stack
            const a = opStack.pop(); // pop the second top number from the stack
            
            let result; // to store the result of the operation
            switch(token){ // perform the operation based on the operator
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    result = a / b;
                    break;
            }
            opStack.push(result) // push the result back to the stack
        }
    }
    return opStack.pop(); // the final result is the only number left in the stack
}

// event and function for equal button, to calculate the result 
// using the functions above and display the result
btnEqual.addEventListener('click', () => {
    const postFix = parseInfixToPosfix(tokens); // convert infix expression to postfix expression
    const result = evaluatePostFix(postFix); // evaluate the postfix expression to get the result
    resultDisplay.textContent = result;// display the result in the result display

    // reset tokens array for the next calculation
    tokens = [];
})