import './style.css'


const displayText = document.querySelector('#display');
const numButton = document.querySelectorAll('.btn-num');
const btnClear = document.getElementById('btn-clear');

// event and function button clear
btnClear.addEventListener('click', () => {
    displayText.textContent = '0';
});

numButton.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.dataset.num;
        if (displayText.textContent === '0') {
            displayText.textContent = value;    
        } else {
            displayText.textContent += value;
        };
    })
})

// numOne.addEventListener('click', () => {
//     if (displayText.textContent === '0') {
//         displayText.textContent = 1;    
//     } else {
//         displayText.textContent += 1;
//     };
// });

// numTwo.addEventListener('click',() => {
//     if (displayText.textContent === '0') {
//         displayText.textContent = 2;    
//     } else {
//         displayText.textContent += 2;
//     };
// });

// numThree.addEventListener('click',() => {
//     if (displayText.textContent === '0') {
//         displayText.textContent = 3;    
//     } else {
//         displayText.textContent += 3;
//     };
// });