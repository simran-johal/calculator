// FUNCTIONS FOR ADD, MINUS, TIMES, DIVIDE
// CALC OPERATION 3 VARIABLES
// CALC OPERATION FUNCTION

let primaryNumber = 5
let secondaryNumber = 10

let operator = {
    add: (num1,num2) => num1 + num2,
    subtract: (num1,num2) => num1 - num2,
    divide: (num1,num2) => num1 / num2,
    multiply: (num1,num2) => num1 * num2,
}

function operate(oper, num1, num2) {
    return operator[oper](num1, num2)
}


console.log(operate('subtract', primaryNumber, secondaryNumber))







// FUNCTIONS THAT POPULATE THE DISPLAY