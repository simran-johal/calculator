




// FUNCTIONS FOR ADD, MINUS, TIMES, DIVIDE INSIDE OBJECT
// CALC OPERATION 3 VARIABLES TO MANAGE DYNAMIC VALUES
// CALC OPERATION FUNCTION THAT TAKES OPERATION & NUMBERS

let primaryNumber = []
let secondaryNumber = []

let operatorObj = { 
    add: (num1,num2) => num1 + num2,
    subtract: (num1,num2) => num1 - num2,
    divide: (num1,num2) => num1 / num2,
    multiply: (num1,num2) => num1 * num2,
}

function operate(oper, num1, num2) {
    if (operatorObj[oper]) {
        return operatorObj[oper](num1, num2)
    }
    else return null
}



// STORE FIRST+SECOND NUMBER INPUT + OPERATION
// CALL OPERATE() WITH THEM WHEN '=' PRESSED

function runOperate() {
    if (buttonValue == '=') {
        operate(operation, primaryNumber, secondaryNumber) // CALLING THE FUNC
    }
    

}



// WORKOUT HOW TO STORE NUMBERS IN AN ARRAY TILL WE CLICK AN OPERATOR
// AT WHICH POINT THOSE NUMBERS MADE INTO SINGLE STRING THEN CONVERTED TO NUMBER('50685')
// ASSIGN THAT NUMBER AS PRIMARYVALUE
// STORE OPERATOR CHOSEN 
// REPEAT ABOVE TO ASSIGN NUMBER TO SECONDARYVALUE
// ADD EVENT LISTENER TO '=' THAT CALLS THE RUNOPERATE() FUNC & PASSES ALL ARGS WHEN CLICKED
// ASSIGN RUNOPERATE OUTPUT TO AN ANSWER VARIABLE AND DISPLAY WHILE REMOVING OTHER VALUES








// FUNCTIONS THAT POPULATE THE DISPLAY
// ADD LISTENERS TO ALL BUTTONS
let buttons = document.querySelectorAll('.buttons') 
buttons.forEach((button) => {
    button.addEventListener('click', function (event) {
       let buttonValue = [] 
       buttonValue.push(Number(event.target.innerHTML))
       
       
       
       displayFunction(buttonValue)
       console.log(buttonValue)

    })

})

// PASS NUMBERS EVENT FIRED ON TO DISPLAYING FUNCTION
let screenDisplay = document.getElementById("screen")
function displayFunction(buttonValue) {
    screenDisplay.innerText = buttonValue
    
}