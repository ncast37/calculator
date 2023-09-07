const buttonsArray = document.querySelectorAll('.btn');
const resultScreen = document.querySelector('.result-screen');
const calculator = {
    'log': [''],
    'primary': '0',
    'secondary': null,
    'operation': null,
    'keyMap': {
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5', 
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9',
        'zero': '0',
        'decimal': '.',
        'plus': add,
        'minus': subtract,
        'divide': divide,
        'multiply': multiply,
        'equal' : null,
    },

    updateLog(value){
        this.log.push(value);
    },

    removeExtraDecimals(){
        const firstDecimalIndex = this.log.indexOf('.');
        for (let i = this.log.length - 1; i > firstDecimalIndex; i--){
            if(this.log[i] === '.'){
                this.log.splice(i, 1);
            }
        }
    },

    convertToString(){
        if(this.log.length != 0){
            return this.log.join('');
        }
    },

    updateScreen(){
        resultScreen.textContent = this.primary; 
        return;
    },

    reset(){
        this.log = [''];
        this.primary = '0';
        this.secondary = null;
        this.operation = null;
        this.updateScreen();
    },
}

buttonsArray.forEach((button) => {
    button.addEventListener('click', (event) =>{
        switch (event.target.dataset.selection) {
            case "number" :
                if(calculator.secondary === null && calculator.operation != null){
                    calculator.secondary = calculator.primary;
                }

                calculator.updateLog(calculator.keyMap[event.target.id]);
                calculator.removeExtraDecimals();
                calculator.primary = calculator.convertToString(calculator.log);
                calculator.updateScreen(calculator.primary);
                break; 

            case "op" :
                let stop = false;
                for (const key in calculator) {
                    if (calculator[key] === null) {
                        calculator.operation = calculator.keyMap[event.target.id];
                        calculator.log = [''];
                        stop = true;
                        break; // Object has a property with a null value
                    }
                } // No property with a null value found
                if(stop === true){
                    break;
                }
                const precision1 = calculator.secondary % 1 === 0 ? 0 : calculator.secondary.toString().split('.')[1].length;
                const precision2 = calculator.primary % 1 === 0 ? 0 : calculator.primary.toString().split('.')[1].length;
                const maxPrecision = Math.max(precision1, precision2);
                const result = calculator.operation(calculator.secondary, calculator.primary);
                calculator.primary = result.toFixed(maxPrecision);
                calculator.operation = calculator.keyMap[event.target.id]; 
                calculator.updateScreen(calculator.primary); 
                calculator.secondary = null;
                calculator.log = [''];
                break;

            case "alt":
                console.log("Alt Selected");
                break;
            case "reset":
                calculator.reset();
            default:
                return; 

        }
    })
})

function add(num1, num2){
    return parseFloat(num1) + parseFloat(num2);
};

function subtract(num1, num2){
    return parseFloat(num1) - parseFloat(num2);
};

function divide(num1, num2){
    return parseFloat(num1)/ parseFloat(num2);
};

function multiply(num1, num2){
    return parseFloat(num1) * parseFloat(num2);
};

const precision1 = calculator.secondary % 1 === 0 ? 0 : calculator.secondary.toString().split('.')[1].length;
const precision2 = calculator.primary % 1 === 0 ? 0 : calculator.primary.toString().split('.')[1].length;