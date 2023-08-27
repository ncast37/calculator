const numButtonsArray = Array.from(document.getElementsByClassName('num'));
const equalButton = document.getElementById('equal');
const resultScreen = document.querySelector('.result-screen');
const resetButton = document.querySelector('#reset');
const opsButtons = document.querySelectorAll('.op');
let operation = null; 
let keyStrokeLog = [];
let primaryString = '0';
let secondaryString = null; 
let recentResult = null;
const keyMap = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'zero': 0,
    'decimal': '.',
    'plus': 'addOp',
    'minus': 'subtractOp',
    'multiply': 'multiplyOp' ,
    'divide': 'divideOp' ,
    'equal': 'equals'
}




document.addEventListener('DomContentLoaded', converToString);

numButtonsArray.forEach((button) => {
    button.addEventListener('click', updatePrimaryString);
});

resetButton.addEventListener('click', clearDisplay);
opsButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        if(operation === null || primaryString === null || secondaryString === null){
            operation = event.target.id;
            secondaryString = primaryString;
            keyStrokeLog = [];
        } else {
            secondaryString = calculate(operation);
            primaryString = null;
            keyStrokeLog = [];
            updateScreen(secondaryString);
            if(event.target.id === 'equal'){
                operation = null;
                primaryString = secondaryString;
            } else {
            operation = event.target.id;
            } 
        }
    } )
})

function clearDisplay(){
    keyStrokeLog = [];
    primaryString = '0';
    secondaryString = null;
    operation = null;  
    updateScreen(primaryString);

}

function updatePrimaryString(e){
    keyStrokeLog.push(keyMap[e.currentTarget.id]);
    converToString();
}

function converToString(){
    if(keyStrokeLog.length != 0 ){  
    let removedDecimalsArray = removeExtraDecimals(keyStrokeLog);
    primaryString = removedDecimalsArray.join('');    }

    updateScreen(primaryString);

}

function removeExtraDecimals(array){
    // Get the index of the first decimal
    // Remove any remaining decimals after that index
    let tempArray = array; 
    const firstDecimalIndex = tempArray.indexOf('.');
    if(firstDecimalIndex != -1){
        for(let i = tempArray.length - 1; i > firstDecimalIndex; i--){
            if(tempArray[i] === '.'){
                tempArray.splice(i, 1);
            }
        }
    }  
    
    return tempArray; 
}

function updateScreen(string){
    resultScreen.textContent = string;
}



function calculate(o) {
    if(o === 'plus') {
        return add(secondaryString, primaryString);
    } else if(o ==='minus') {
        return subtract(secondaryString, primaryString);
    } else if(o === 'divide') {
        return divide(secondaryString, primaryString);
    } else if(o ==='multiply') {
        return multiply(secondaryString, primaryString);
    } else if( o === 'equal') {
        operation = null; 
    }
}

function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2); 
}

function subtract(num1, num2){
    return parseFloat(num1) - parseFloat(num2);
}

function divide(num1, num2){
    return parseFloat(num1)/parseFloat(num2);
}

function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2); 
}

