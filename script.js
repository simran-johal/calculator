








const screenNumPrimary = document.getElementById("screen-num-primary")
const screenNumSecondary = document.getElementById("screen-num-secondary")
const buttons = document.querySelectorAll('.buttons')
const resetButton = document.getElementById('reset-button')
const clearButton = document.getElementById('clear-button')

const operatorObj = { 
    add: (num1,num2) => num1 + num2,
    subtract: (num1,num2) => num1 - num2,
    divide: (num1,num2) => num1 / num2,
    multiply: (num1,num2) => num1 * num2,
}

let primaryNumber = null; 
let secondaryNumber = null;
let displayOperator = null;
let calcOperator = null
let currentNumber = "";
let resultToRound
let result = null;
let chainedOperation = false
const numbersRegex = /^[0-9]$/
const operatorsRegex = /[\+\-x÷]/

function displayFunction({ currentNumber = "", primaryNumber = "", displayOperator = "", secondaryNumber = "", result = "" }) {

    let displayTextPrimary = ""
    let displayTextSecondary = ""
  
    if (chainedOperation) {
        displayTextPrimary = `${primaryNumber} ${displayOperator} ${secondaryNumber}`
        displayTextSecondary = ""
            consoleLogger()

    } else if (result !== null) {                                                          
        displayTextPrimary = `${primaryNumber} ${displayOperator} ${secondaryNumber}`; // state equals clicked, no currentNumber but have the rest
        displayTextSecondary = `= ${result}`    

    } else if (currentNumber !== "" && primaryNumber !== null && displayOperator !== null) { // state new currentNum but primaryNum and currentOperator too
        displayTextPrimary = `${primaryNumber} ${displayOperator} ${currentNumber}`;

    } else if (primaryNumber !== null && displayOperator !== null) { // state have a primaryNumber and cprimaryOperator 
        displayTextPrimary = `${primaryNumber} ${displayOperator}`;

    } else displayTextPrimary = currentNumber // state displaying the current number as we click updating it


    screenNumPrimary.innerText = displayTextPrimary
    screenNumSecondary.innerText = displayTextSecondary

}

function resetCalculator(newPrimary = null, newDisplayOperator = null) {
    console.log("resetCalculator called")
    primaryNumber = newPrimary
    secondaryNumber = null;
    displayOperator = newDisplayOperator
    currentNumber = ""
    result = null; 
    chainedOperation = false
    console.log("variables reset")
    consoleLogger()
   
}

buttons.forEach((button) => {
    button.addEventListener('click', function (event) {

       const content = event.target.innerHTML // capture the inner HTML

       if (numbersRegex.test(content)) handleNumbers(content) 
       else if (operatorsRegex.test(content)) handleOperators(content)
       else if (/=/.test(event.target.innerHTML)) handleEquals()
       
       
       if (result !== null && !chainedOperation !== null) {
        displayFunction({ currentNumber, primaryNumber, displayOperator, secondaryNumber, result})
       }
       

    })

})

function handleNumbers(content) {

    
   
    if (result !== null && !chainedOperation) { // if already have result
        resetCalculator()
    } else if (chainedOperation) {
        resetCalculator(primaryNumber, displayOperator)
    }  
    
  
    currentNumber += content // if dont have result appending with new number 
    displayFunction({ currentNumber, primaryNumber, displayOperator, secondaryNumber, result })
    consoleLogger() 

}

function handleOperators(content) {


    if (result !== null) { // already have a result assign it to primaryNumber
        primaryNumber = result
        resetCalculator(result)
    }

    if (primaryNumber !== null && currentNumber !== "") { // you have a primary number and a new number

        secondaryNumber = currentNumber; // where no result but have primary, current number = secondary number
        runOperate(calcOperator, parseFloat(primaryNumber), parseFloat(secondaryNumber)); // perform the operation
        primaryNumber = result; // now result becomes the new primary number
        chainedOperation = true
        secondaryNumber = ""
        
    }

    else if (primaryNumber === null) { // no primary number 
        primaryNumber = currentNumber // so set your current number to primary 
    }

    switch (content) {
        case '+': calcOperator = 'add'; break;
        case '-': calcOperator = 'subtract'; break;
        case 'x': calcOperator = 'multiply'; break;
        case '÷': calcOperator = 'divide'; break;
    }

    displayOperator = content
    currentNumber = ""
    displayFunction({ currentNumber, primaryNumber, displayOperator, secondaryNumber, result })
    consoleLogger()    


}

function handleEquals() {

    const primaryNum = parseFloat(primaryNumber)
    const currentNum = parseFloat(currentNumber)

    if (!isNaN(primaryNum) && !isNaN(currentNum) && calcOperator !== null) { // we have a primary num/current num and operator
        secondaryNumber = currentNumber // assign current num to secondary number
        runOperate(calcOperator, primaryNum, secondaryNumber) // pass it all to runOperate + convert strings to numbers
        consoleLogger()
    }

    currentNumber = ""
    displayFunction({ currentNumber, primaryNumber, displayOperator, secondaryNumber, result })
    chainedOperation = false
    consoleLogger()
}

function runOperate(calcOper, primaryNum, secondaryNUM) {
    resultToRound = operatorObj[calcOper](primaryNum, secondaryNUM)
    result = Math.round(resultToRound * 100) / 100
    displayFunction({ currentNumber, primaryNumber, displayOperator, secondaryNumber, result })
    
    
}

function consoleLogger() {
    console.log("-------")
        console.log("primary number", primaryNumber)
        console.log("secondary number", secondaryNumber)
        console.log("current number", currentNumber)
        console.log("calc operator", calcOperator)
        console.log("display operator", displayOperator)
        console.log("result", result)

}



clearButton.addEventListener('click', function () {
    currentNumber = ""
    displayFunction({currentNumber, primaryNumber, displayOperator, secondaryNumber, result})
})

resetButton.addEventListener('click', function () {
    resetCalculator()
    displayFunction({currentNumber, primaryNumber, displayOperator, secondaryNumber, result})
})



















// FIRST NUMBER CANT BE ZERO
// COMPLETE UI
// BETTER WAY TO WRITE MY LOGIC NOT ALL IN THE ONE EVENT HANDLER


