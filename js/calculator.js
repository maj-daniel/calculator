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
    registry.textContent += ` ${display.textContent}`;
    const calcArray = registry.textContent.split(" ");

    switch(calcArray[1]){
        case "+":
            return display.textContent = add(parseFloat(calcArray[0]), parseFloat(calcArray[2]));
        case "-":
            return display.textContent = subtract(parseFloat(calcArray[0]), parseFloat(calcArray[2]));
        case "x":
            return display.textContent = multiply(parseFloat(calcArray[0]), parseFloat(calcArray[2]));
        case "/":
            return display.textContent = divide(parseFloat(calcArray[0]), parseFloat(calcArray[2]));
    }
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
    if(display.textContent.length === "") return;

    lastNumber = parseFloat(display.textContent);
    operator = e.target.textContent;
    registry.textContent = `${lastNumber} ${operator}`
    return display.textContent = "";
}

/* 
Calculator

1 - Populate display
2 - Store the number writen in the display when click on operators
3 - Save operator and wait for new operator
4 - Operate calculation when "=" is clicked
*/