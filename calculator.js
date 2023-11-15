const buttons = document.querySelectorAll('.btn');
const displayInput = document.querySelector('.display__input');
const displayOutput = document.querySelector('.display__output');
const operators = ["+", "-", "*", "/"];

let input = "";

console.log();

for (let i = 0; i < buttons.length; i++) {
    const value = buttons[i].dataset.btn;
    console.log(value);
    
    buttons[i].addEventListener('click',  ()=> {
        
        
        if (validateInput(value)) {
            if (value === "clear") {
                input = '';
                displayInput.innerHTML = '';
                displayOutput.innerHTML = '';
            }else if (value === 'backspace') {
                input = input.slice(0, -1);
                displayInput.innerHTML = cleantInput(input);
            }else if (value === '%') {
                input += '%';
                displayInput.innerHTML = cleantInput(input);
                
            }else if (value === 'brackets') {
                if (input.indexOf("(") == -1 ||
                input.indexOf(")") != -1 &&
                inpur.indexOf(")") != -1 &&
                input.lastIndexOf("(") < input.lastIndexOf(")")) 
                {
                    input+= "(";
                } else if (input.indexOf("(") != -1 &&
                input.indexOf(")") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.indexOf("(") > input.lastIndexOf("")) 
                {
                    input += ")";
                }
                displayInput.innerHTML = cleantInput(input);
                
            }else if (value === 'divide') {
                input += '/';
                displayInput.innerHTML = cleantInput(input);
                
            }else if (value === '*') {
                input += '*';            
                displayInput.innerHTML = cleantInput(input);
                
            }else if (value === '-') {
                input += '-';            
                displayInput.innerHTML = cleantInput(input);
                
            }else if (value === '+') {
                input += '+';            
                displayInput.innerHTML = cleantInput(input);
                
            }else if (value === '.') {
                input += '.';            
                displayInput.innerHTML = cleantInput(input);
                
            }else if (value === '=') {
                let result = evaluateInput(input);
                
                displayInput.innerHTML = cleantInput(input);
                displayOutput.innerHTML = cleanOutput(result);
                input = "";
                
            }
            else {
                input += value;
                displayInput.innerHTML = cleantInput(input);
                
            }
        }
        

       
        
    })
    
}


function evaluateInput (inputString) {

    inputArray = getInputArray(inputString) ;
    console.log(inputArray);
    let addSubResult = addSub(inputArray);
    console.log(addSubResult);
    return addSubResult;
    
    
}

function addSub(evalArray) {
    evalArray = multDivide(evalArray);
    let intResult = parseInt(evalArray[0]);
    for (let i = 1; i < evalArray.length - 1; i += 2) {
        if (evalArray[i] == "+") {
            intResult += parseInt(evalArray[i+1]);
            
        } else {
            intResult -= parseInt(evalArray[i+1]);
        }
        
    }

    return intResult;
}

function multDivide(evalArray) {
    for (let i = 1; i < evalArray.length - 1; i += 2) {
        if (evalArray[i] == "*") {
            let lastNum = parseInt(evalArray[i - 1]);
            lastNum *= parseInt(evalArray[i+1]) 
            evalArray[i-1] = lastNum.toString();
            evalArray.splice(i, 2);
            i -= 2;
        } else if (evalArray[i] == "/") {
            let lastNum = parseInt(evalArray[i - 1]);
            lastNum /= parseInt(evalArray[i+1]) 
            evalArray[i-1] = lastNum.toString();
            evalArray.splice(i, 2);
            i -= 2;
        }
    }
    return evalArray;
}

function getInputArray(str) {
    let count = 0;
    let strArray = [''];
       
    for (let i = 0; i < str.length; i++) {
        if(operators.includes(str[i])) {
            count += 2;
            strArray.push(str[i]);
            strArray.push("");
        } else {
            strArray[count] += str[i];
    
        }
    }
    return strArray;

}

function cleantInput(input) {
    let inputArray = input.split("");
    let inputArrayLength = inputArray.length;

    for (let i = 0; i < inputArrayLength; i++) {
        if (inputArray[i] == "*") {
            inputArray[i] = ' <span class="btn--operator">X</span> ';
        }else if (inputArray[i] == "/") {
            inputArray[i] = ` <span class="btn--operator">/</span> `;
        }else if (inputArray[i] == "+") {
            inputArray[i] = ` <span class="btn--operator">+</span> `;
        }else if (inputArray[i] == "-") {
            inputArray[i] = ` <span class="btn--operator">-</span> `;
        }else if (inputArray[i] == "(") {
            inputArray[i] = ` <span class="display--brackets">(</span> `;
        }else if (inputArray[i] == ")") {
            inputArray[i] = ` <span class="display--brackets">)</span> `;
        }else if (inputArray[i] == "%") {
            inputArray[i] = ` <span class="btn--action">%</span> `;
        }
    }

    return inputArray.join("");
}

function cleanOutput(output) {
    let outputString = output.toString();
    let decimal = outputString.split(".")[1];
    outputString = outputString.split(".")[0];
    

    let outputArray = outputString.split('');

    if (outputArray.length > 3) {
        for (let i = outputArray.length - 3; i > 0; i-= 3) {
            outputArray.splice(i, 0, ",");
            }
    }

    if (decimal) {
        outputArray.push(".");
        outputArray.push(decimal);
    }

    return outputArray.join("");

}

function validateInput (value) {
    let lastInput = input.slice(-1);

    if (value == "." && lastInput == ".") {
        return false;
    }

    if (operators.includes(value)) {
        if (operators.includes(lastInput)) {
            return false;
        } else {
            return true;
        }
    }
    
    return true;
}
