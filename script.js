

let screenNumPrimary = document.getElementById("screen-num-primary")
let screenNumSecondary = document.getElementById("screen-num-secondary")
let buttons = document.querySelectorAll('.buttons')

let primaryNumber = null; 
let secondaryNumber = null;
let primaryOperator = null;
let currentNumber = "";
let result = null;

let operatorObj = { 
    add: (num1,num2) => num1 + num2,
    subtract: (num1,num2) => num1 - num2,
    divide: (num1,num2) => num1 / num2,
    multiply: (num1,num2) => num1 * num2,
}



function displayFunction({ currentNumber = "", primaryNumber = "", primaryOperator = "", secondaryNumber = "", result = "" }) {

    let displayTextPrimary = ""
    let displayTextSecondary = ""
  
    if (result !== null) {                                                          
        displayTextPrimary = `${primaryNumber} ${primaryOperator} ${secondaryNumber}`; // state equals clicked, no currentNumber but have the rest
        displayTextSecondary = `= ${result}`    
    } 
   
    else if (currentNumber !== "" && primaryNumber !== null && primaryOperator !== null) { // state new currentNum but primaryNum and currentOperator too
        displayTextPrimary = `${primaryNumber} ${primaryOperator} ${currentNumber}`;
    }
    
    else if (primaryNumber !== null && primaryOperator !== null) { // state have a primaryNumber and cprimaryOperator 
        displayTextPrimary = `${primaryNumber} ${primaryOperator}`;
    }
    
    else displayTextPrimary = currentNumber // state displaying the current number as we click updating it

    // UNDERSTAND HOW ITS BUILDING A NUMBER WHEN COULDNT DO THIS TO BEGIN WITH

    screenNumPrimary.innerText = displayTextPrimary
    screenNumSecondary.innerText = displayTextSecondary

}

function resetCalculator() {
    primaryNumber = null;
    secondaryNumber = null;
    primaryOperator = null;
    currentNumber = ""
    result = null; 
   
}

buttons.forEach((button) => {
    button.addEventListener('click', function (event) {

       const content = event.target.innerHTML // capture the inner HTML

       if (/^[0-9]$/.test(content)) { // handling numbers //

            if (result !== null) { // if already have result
                resetCalculator()
            } currentNumber += content // if dont have result
            displayFunction({ currentNumber, primaryNumber, primaryOperator, secondaryNumber, result })
        }
       
       else if (/[\+\-x÷]/.test(content)) { // handling operators //
            
            if (result !== null) { // where already have a result 
                primaryNumber = result
                resetCalculator()
            }
            if (primaryNumber === null) { // no primary number means no result
                primaryNumber = currentNumber // so set your current number to primary
            } else {
                secondaryNumber = currentNumber // if result isnt set to primary + already have a primary
            }
            primaryOperator = content
            currentNumber = ""
            displayFunction({ currentNumber, primaryNumber, primaryOperator, secondaryNumber, result })

            switch (content) {
                case '+':
                    primaryOperator = 'add';
                    break;
                case '-':
                    primaryOperator = 'subtract';
                    break;
                case 'x':
                    primaryOperator = 'multiply';
                    break;
                case '÷':
                    primaryOperator = 'divide';
                    break;
            }

       }

       else if (/=/.test(event.target.innerHTML)) { // handling equals //

            if (primaryNumber !== null && primaryOperator !== null) { // we have a primary num and operator
                secondaryNumber = currentNumber // assign current num to secondary number
                runOperate(primaryOperator, parseFloat(primaryNumber), parseFloat(secondaryNumber)) // pass it all to operation function
            }
    
            currentNumber = ""
            displayFunction({ currentNumber, primaryNumber, primaryOperator, secondaryNumber, result })
       }


    })

})


function runOperate(primOper, primNum, seconNUM) {
    result = operatorObj[primOper](primNum, seconNUM)
    currentNumber = ""
    displayFunction({ currentNumber, primaryNumber, primaryOperator, secondaryNumber, result })
    
}
























// GO THROUGH THE CODE AND ADJUST IT BACK TO THE WAYS THAT MADE SENSE TO ME EG.
    // PASSING ARGUMENTS TO DISPLAY FUNCTION 
    // USING THE METHODS APPROACH TO DOING THE CALCULATION
// ADD DELETE AND CLEAR LOGIC