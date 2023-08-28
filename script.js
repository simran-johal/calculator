

let screenNumPrimary = document.getElementById("screen-num-primary")
let screenNumSecondary = document.getElementById("screen-num-secondary")
let buttons = document.querySelectorAll('.buttons')

let primaryNumber = null; 
let secondaryNumber = null;
let displayOperator = null;
let calcOperator = null
let currentNumber = "";
let result = null;

let operatorObj = { 
    add: (num1,num2) => num1 + num2,
    subtract: (num1,num2) => num1 - num2,
    divide: (num1,num2) => num1 / num2,
    multiply: (num1,num2) => num1 * num2,
}



function displayFunction({ currentNumber = "", primaryNumber = "", displayOperator = "", secondaryNumber = "", result = "" }) {

    let displayTextPrimary = ""
    let displayTextSecondary = ""
  
    if (result !== null) {                                                          
        displayTextPrimary = `${primaryNumber} ${displayOperator} ${secondaryNumber}`; // state equals clicked, no currentNumber but have the rest
        displayTextSecondary = `= ${result}`    
    } 
   
    else if (currentNumber !== "" && primaryNumber !== null && displayOperator !== null) { // state new currentNum but primaryNum and currentOperator too
        displayTextPrimary = `${primaryNumber} ${displayOperator} ${currentNumber}`;
    }
    
    else if (primaryNumber !== null && displayOperator !== null) { // state have a primaryNumber and cprimaryOperator 
        displayTextPrimary = `${primaryNumber} ${displayOperator}`;
    }
    
    else displayTextPrimary = currentNumber // state displaying the current number as we click updating it

    

    screenNumPrimary.innerText = displayTextPrimary
    screenNumSecondary.innerText = displayTextSecondary

}

function resetCalculator(newPrimary = null) {
    primaryNumber = newPrimary
    secondaryNumber = null;
    displayOperator = null;
    currentNumber = ""
    result = null; 
   
}

buttons.forEach((button) => {
    button.addEventListener('click', function (event) {

       const content = event.target.innerHTML // capture the inner HTML

       if (/^[0-9]$/.test(content)) { // HANDLING NUMBERS //

            if (result !== null) { // if already have result
                resetCalculator()
            } currentNumber += content // if dont have result appending with new number 
            displayFunction({ currentNumber, primaryNumber, displayOperator, secondaryNumber, result })
        }
       
       else if (/[\+\-x÷]/.test(content)) { // HANDLING OPERATORS //
            
            if (result !== null) { // already have a result assign it to primaryNumber
                primaryNumber = result
                resetCalculator(result)
            }
            if (primaryNumber === null) { // no primary number means no result
                primaryNumber = currentNumber // so set your current number to primary
            } else {
                secondaryNumber = currentNumber // if result isnt set to primary + already have a primary
            }
            

            switch (content) {
                case '+':
                    calcOperator = 'add';
                    break;
                case '-':
                    calcOperator = 'subtract';
                    break;
                case 'x':
                    calcOperator = 'multiply';
                    break;
                case '÷':
                    calcOperator = 'divide';
                    break;
            }

            displayOperator = content
            currentNumber = ""
            displayFunction({ currentNumber, primaryNumber, displayOperator, secondaryNumber, result })
            
       }

       else if (/=/.test(event.target.innerHTML)) { // HANDLING EQUALS //

            if (primaryNumber !== null && calcOperator !== null) { // we have a primary num and operator
                
                console.log("primary num", primaryNumber)
                console.log("operator", calcOperator)
                console.log("secondary num", secondaryNumber = currentNumber) // assign current num to secondary number
                runOperate(calcOperator, parseFloat(primaryNumber), parseFloat(secondaryNumber)) // pass it all to runOperate + convert strings to numbers
                
            }
    
            currentNumber = ""
            displayFunction({ currentNumber, primaryNumber, displayOperator, secondaryNumber, result })
       }


    })

})


function runOperate(calcOper, primNum, seconNUM) {
    result = operatorObj[calcOper](primNum, seconNUM)
    displayFunction({ currentNumber, primaryNumber, displayOperator, secondaryNumber, result })
    
    
}
























// COMPLETE CALCULATOR TO WORK 
// ADD DELETE AND CLEAR LOGIC
// COMPLETE UI