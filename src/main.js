import './style.css'


const displayText = document.querySelector('#display'); // querySelector to select element with id display
const numButton = document.querySelectorAll('.btn-num'); // querySelectorAll to select all elements with class btn-num
const btnClear = document.getElementById('btn-clear');
const btnBackspace = document.getElementById('btn-backspace');

// event and function button clear
btnClear.addEventListener('click', () => {
    displayText.textContent = '0';
});

// event and function to delete/backspace
btnBackspace.addEventListener('click', () => {
    if (displayText.textContent.length === 1) { // if only one character left, reset to 0
        displayText.textContent = '0';
    } else {
        displayText.textContent = displayText.textContent.slice(0, -1); // slice method to remove last character, slice(0, -1) means start from index 0 to the second last character.
    } 
    // why displayText.textContent can use slice method? because displayText.textContent is a string, and string has slice method.
});

// event and function for number buttons 0-9
// using forEach because numButton used querySelectorAll which returns a node list
// node list is similar to an array, so we can use forEach to loop through each button
numButton.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.dataset.num; // dataset.num to get the value of data-num attribute from the button
        if (displayText.textContent === '0') {
            displayText.textContent = value;    
        } else {
            displayText.textContent += value;
        };
    })
})

