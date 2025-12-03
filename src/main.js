import './style.css'

function getEleId(id) {
    document.getElementById(id);
}
const displayText = document.getElementById('display');

const numOne = document.getElementById('btn-One');
const numTwo = document.getElementById('btn-two');
const numThree = document.getElementById('btn-three');
const numFour = document.getElementById('btn-four');
const numFive = document.getElementById('btn-five');
const numSix = document.getElementById('btn-six');
const numSeven = document.getElementById('btn-seven');
const numEight = document.getElementById('btn-eight');
const numNine = document.getElementById('btn-nines')

numOne.addEventListener('click', () => {
    document.getElementById('display').innerText = 1
})