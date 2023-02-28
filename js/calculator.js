const display = document.querySelector(".visor .current");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const functionBtns = document.querySelectorAll(".function");
const registry = document.querySelector(".visor .previous");

let lastNumber = null;
let currentNumber = null;
let operator = null;
let wasEqualPressed = false;

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
    return Math.round((a + b)* 1000) / 1000;
}

function subtract(a, b) {
    return Math.round((a - b)* 1000) / 1000;
}

function multiply(a, b) {
    return Math.round((a * b)* 1000) / 1000;
}

function divide(a, b) {
    return Math.round((a / b)* 1000) / 1000;
}

function operate() {

    //prevent from using not numbers
    if(isNaN(currentNumber) || isNaN(lastNumber) || currentNumber == null || lastNumber == null) return lastNumber;
    if(currentNumber === 0 && operator === '/'){
        currentNumber = null;
        operator = null;
        lastNumber = null;
        return display.textContent = "ERROR";
    }

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

    currentNumber = null;
    operator = null;
    return lastNumber = result;
}

function updateDisplay(e) {
    const btn = e.target.textContent;
    console.log(btn);
    if(display.textContent === "ERROR"){
        display.textContent = "";
        registry.textContent = ""
    }
    if(display.textContent.length >= 9) return;

    if(display.textContent == 0 && display.textContent === "0"){
        currentNumber = parseFloat(display.textContent);
        return display.textContent = btn;
    }

    display.textContent += btn;
    return currentNumber = parseFloat(display.textContent);
}

function getOperator(e) {
    if(display.textContent === "ERROR") return;
    if(display.textContent.length === 0 && registry.textContent.length === 0) return;
    if(display.textContent.length === 0){
        operator = e.target.textContent;
        return registry.textContent = `${registry.textContent.slice(0,-1)} ${operator}`;
    } else if(parseFloat(display.textContent)!= 0 && registry.textContent !== ""){
        lastNumber = operate();
        currentNumber = null;
        operator = e.target.textContent;
    } else {
        operator = e.target.textContent;
        lastNumber = parseFloat(display.textContent);
    }

    registry.textContent = `${lastNumber} ${operator}`;
    return display.textContent = "";
}

function clear() {
    lastNumber = null;
    currentNumber = null;
    operator = null;
    display.textContent = "";
    registry.textContent = "";
    return;
}

/* 
Calculator

1 - Populate display
2 - Store the number writen in the display when click on operators
3 - Save operator and wait for new operator
4 - Operate calculation when "=" is clicked
5 - Take string and separete into an array in order to do calculation
*/