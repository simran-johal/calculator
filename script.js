







// FUNCTIONS THAT POPULATE THE DISPLAY
// ADD LISTENERS TO ALL BUTTONS
let primaryNumber = null
let secondaryNumber = null
let primaryOperator = null
let buttonValue = [] 

let currentNumber
let currentOperator
let buttons = document.querySelectorAll('.buttons') 

let equalSelected = false
let operatorSelected = false



//------------------------------------------------------------------------------------


buttons.forEach((button) => {
    button.addEventListener('click', function (event) {



//------------------------------------------------------------------------------------

       // NUMBER SELECTED LOGIC
       if (/^[0-9]$/.test(event.target.innerHTML)) { 

            // WHEN NUMBER SELECTED AFTER OPERATOR THIS RESETS SO NEW CURRENTNUMBER CAN BUILD
            if (operatorSelected) { 
                buttonValue = []
                operatorSelected = false
            }

            // CREATES A BUTTONVAL ARRAY THEN TURNS INTO NUMBER AND JOINS AND ASSIGNS TO CURRENTNUM
            buttonValue.push(Number(event.target.innerHTML))
            currentNumber = Number(buttonValue.join(""))
       
            console.log("current number", currentNumber)
            
        }

       // OPERATOR SELECTED LOGIC
       if (/[\+\-x÷]/.test(event.target.innerHTML)) {
            
            operatorSelected = true

            switch (event.target.innerHTML) {
                case '+':
                    primaryOperator = "add";
                    break;
                case '-':
                    primaryOperator = "subtract";
                    break;
                case '÷':
                    primaryOperator = "divide";
                    break;
                case 'x':
                    primaryOperator = "multiply";
                    break;
            }
            
            



            if (primaryNumber == null) {
                primaryNumber = currentNumber;
            } else if (primaryNumber !== null && secondaryNumber == null) {
                secondaryNumber = currentNumber }
            
            buttonValue = []
            currentNumber = null;
            console.log("current number", currentNumber)
            console.log("primary number", primaryNumber)
            console.log("Secondary number", secondaryNumber)
            console.log("primary operator", primaryOperator)
       }

//------------------------------------------------------------------------------------


       // EQUALS SELECTED LOGIC TO USE OUTPUTS OF OPERATOR/NUMBER LOGIC ABOVE
       if (/=/.test(event.target.innerHTML)) {

        equalSelected = true
        secondaryNumber = currentNumber
        runOperate(primaryOperator, primaryNumber, secondaryNumber)
        
       }

    })

})


//------------------------------------------------------------------------------------



let result
let operatorObj = { 
    add: (num1,num2) => num1 + num2,
    subtract: (num1,num2) => num1 - num2,
    divide: (num1,num2) => num1 / num2,
    multiply: (num1,num2) => num1 * num2,
}


function runOperate(primOper, primNum, seconNUM) {
    
    result = operatorObj[primOper](primNum, seconNUM)
    console.log("runOperate result", result)
    return result

}
// RUNOPERATE FUNCTION WORKS
 console.log("personal checks: runOperate check", runOperate("divide", 10, 20)) 
 



//------------------------------------------------------------------------------------





// PASS NUMBERS EVENT FIRED ON TO DISPLAYING FUNCTION
let screenDisplay = document.getElementById("screen")
function displayFunction(primaryNumber, primaryOperator, secondaryNumber ) {



    screenDisplay.innerText = primaryNumber + primaryOperator + secondaryNumber
    
}

