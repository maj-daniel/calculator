const display = document.querySelector(".visor .current");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const functionBtns = document.querySelectorAll(".function");
const registry = document.querySelector(".visor .previous");

let lastNumber = null;
let currentNumber = null;
let operator = null;

digitBtns.forEach(btn =>{
    btn.addEventListener("click", updateDisplay);
})
operatorBtns.forEach(btn =>{
    btn.addEventListener("click", getOperator);
})
functionBtns.forEach(btn =>{
    if(btn.textContent === "="){
        btn.addEventListener("click", operate);
    }
    if(btn.textContent === "AC"){
        btn.addEventListener("click", clear);
    }
})

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate() {
    currentNumber = parseFloat(display.textContent);
    registry.textContent = `${lastNumber} ${operator} ${currentNumber}`;
    let result;

    switch(operator){
        case "+":
            result = add(lastNumber, currentNumber);
            display.textContent = result;
            break;
        case "-":
            result = subtract(lastNumber, currentNumber);
            display.textContent = result;
            break;
        case "x":
            result = multiply(lastNumber, currentNumber);
            display.textContent = result;
            break;
        case "/":
            result = divide(lastNumber, currentNumber);
            display.textContent = result;
    }

    return result;
}

function updateDisplay(e) {
    const btn = e.target.textContent;
    console.log(btn);
    if(display.textContent.length >= 9) return;

    if(display.textContent == 0 && display.textContent === "0"){
        return display.textContent = btn;
    }
    return display.textContent += btn;
}

function getOperator(e) {

    if(display.textContent.length === 0 && registry.textContent.length === 0) return;
    if(display.textContent.length === 0){
        operator = e.target.textContent;
        return registry.textContent = `${registry.textContent.slice(0,-1)} ${operator}`;
    } else if(parseFloat(display.textContent)!= 0 && registry.textContent !== ""){
        lastNumber = operate();
        operator = e.target.textContent;
    } else {
        operator = e.target.textContent;
        lastNumber = parseFloat(display.textContent);
    }
   
    registry.textContent = `${lastNumber} ${operator}`
    return display.textContent = "";
}

function clear() {
    if(display.textContent === ""){
        return registry.textContent = "";
    }
    return display.textContent = "";
}

/* 
Calculator

1 - Populate display
2 - Store the number writen in the display when click on operators
3 - Save operator and wait for new operator
4 - Operate calculation when "=" is clicked
5 - Take string and separete into an array in order to do calculation
*/