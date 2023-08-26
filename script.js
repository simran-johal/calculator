
// PASS NUMBERS EVENT FIRED ON TO DISPLAYING FUNCTION



let screenDisplay = document.getElementById("screen")
function displayFunction({ currentNumber = "", primaryNumber = "", currentOperator = "", secondaryNumber = "", result = "" }) {

    let displayText = ""

    
    
    //STATE: EQUALS - NO CURRENTNUM, BUT HAVE ALL THE REST
    if (result !== "") {
        displayText = `${primaryNumber} ${currentOperator} ${secondaryNumber} = ${result}`;
    } 
    //STATE: NEW CURRENTNUM BUT PRIMNUM AND CURRENTOPERATOR NOT EMPTY
    else if (currentNumber !== "" && primaryNumber !== "" && currentOperator !== "") {
        displayText = `${primaryNumber} ${currentOperator} ${currentNumber}`;
    }
    //STATE: CHOSEN OPERATOR - HAVE A PRIMARYNUM + HAVE A CURRENTOPERATOR
    else if (primaryNumber !== "" && currentOperator !== "") {
        displayText = `${primaryNumber} ${currentOperator}`;
    }
    //STATE: 1ST NO - DISPLAY CURRENT NUMBER UPDATING EACH TIME NO. CLICKED (PRIMARYNUM IS EMPTY)
    else if (currentNumber !== "") {
        displayText = `${currentNumber}`;
    }



    //START STATE
    //STATE: 1ST NO - DISPLAY CURRENT NUMBER UPDATING EACH TIME NO. CLICKED (PRIMARYNUM IS EMPTY)
    //STATE: CHOSEN OPERATOR - HAVE A PRIMARYNUM + HAVE A CURRENTOPERATOR
    //STATE: NEW CURRENTNUM BUT PRIMNUM AND CURRENTOPERATOR NOT EMPTY
    //STATE: EQUALS - NO CURRENTNUM, BUT HAVE ALL THE REST

    
    

    
    screenDisplay.innerText = displayText
}

//------------------------------------------------------------------------------------

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
            displayFunction( {currentNumber, primaryNumber, currentOperator, secondaryNumber, result} )
            
            console.log("current number", currentNumber)
            
        }

       // OPERATOR SELECTED LOGIC
       if (/[\+\-x÷]/.test(event.target.innerHTML)) {
            
            operatorSelected = true
            console.log("current operator", currentOperator = event.target.innerHTML)

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
                console.log("primary number", primaryNumber = currentNumber)
            } else if (primaryNumber !== null && secondaryNumber == null) {
                console.log("secondary number", secondaryNumber = currentNumber) }
            
            buttonValue = []
            currentNumber = "";
            displayFunction({ currentNumber, primaryNumber, currentOperator, secondaryNumber, result})
            
       }

       // EQUALS SELECTED LOGIC TO USE OUTPUTS OF OPERATOR/NUMBER LOGIC ABOVE
       if (/=/.test(event.target.innerHTML)) {

        equalSelected = true
        secondaryNumber = currentNumber
        runOperate(primaryOperator, primaryNumber, secondaryNumber,)
        
       }

    })

})


//------------------------------------------------------------------------------------

//FUNCTIONS TO EXECUTE CALCULATIONS

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
    displayFunction({ currentNumber, primaryNumber, currentOperator, secondaryNumber, result })
    
}

















