const buttons = document.querySelectorAll('.btn');
const displayInput = document.querySelector('.display__input');
const displayOutput = document.querySelector('.display__output');
const operators = ["+", "-", "*", "/", "%", "(", ")"];

let input = "";



for (let i = 0; i < buttons.length; i++) {
    const value = buttons[i].dataset.btn;

    
    buttons[i].addEventListener('click',  ()=> {
        
        
        if (validateInput(value)) {
            if (value != "=") {
                displayOutput.innerHTML = "";
            }
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
    // console.log(inputString);
    inputArray = getInputArray(inputString) ;
    // console.log(inputArray);
    let addSubResult = addSub(inputArray);
    return Math.round(addSubResult * 100) / 100;
    
    
}

function addSub(evalArray) {
    evalArray = multDivide(evalArray);
    // console.log(evalArray);
    let intResult = parseFloat(evalArray[0]);
    for (let i = 1; i < evalArray.length - 1; i += 2) {
        if (evalArray[i] == "+") {
            intResult += parseFloat(evalArray[i+1]);
            
        } else {
            intResult -= parseFloat(evalArray[i+1]);
        }
        
    }

    return intResult;
}

function multDivide(evalArray) {
    evalArray = getPercent(evalArray);
    for (let i = 1; i < evalArray.length - 1; i += 2) {
        if (evalArray[i] == "*") {
            let lastNum = parseFloat(evalArray[i - 1]);
            lastNum *= parseFloat(evalArray[i+1]) 
            evalArray[i-1] = lastNum.toString();
            evalArray.splice(i, 2);
            i -= 2;
        } else if (evalArray[i] == "/") {
            let lastNum = parseFloat(evalArray[i - 1]);
            lastNum /= parseFloat(evalArray[i+1]) 
            evalArray[i-1] = lastNum.toString();
            evalArray.splice(i, 2);
            i -= 2;
        }
    }
    return evalArray;
}

function getPercent(evalArray) {
    evalArray = calcBrackets(evalArray);
    for (let i = 0; i < evalArray.length; i++) {
        if (evalArray[i] == "%") {
            evalArray[i-1] = (parseFloat(evalArray[i-1]) / 100).toString();
            evalArray.splice(i, 1);
            i -= 1;
        }
    }
    return evalArray;
}

function calcBrackets(evalArray) {
    let openBracketIndex = 0;
    let closeBracketIndex = 0;
    console.log(evalArray);
    for (let i = 0; i < evalArray.length; i++) {
        if (evalArray[i] == "(") {
            openBracketIndex = i;
        }else if (evalArray[i] == ")") {
            closeBracketIndex = i;
            evalArray[openBracketIndex] = 
            addSub(evalArray.slice(openBracketIndex + 1, closeBracketIndex)).toString();
            i = openBracketIndex;
            evalArray.splice(openBracketIndex + 1, closeBracketIndex );
        }

    }
    return evalArray;
}

function getInputArray(str) {
    let count = 0;
    let strArray = [''];
       
    for (let i = 0; i < str.length; i++) {
        if(operators.includes(str[i])) {
            if (strArray[-2] == "%") {
                count += 1;
                strArray[-1] += str[i];
                strArray.push("");
            }else {
                count += 2;
                strArray.push(str[i]);
                strArray.push("");

            }
        } else {
            strArray[count] += str[i];
    
        }
    }
    return cleanArray(strArray);

}

function cleanArray(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == "") {
            array.splice(i, 1);
        }
    }

    return array;
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

    if (lastInput == "%" && value == "%" || 
    lastInput == "%" && !operators.includes(value)) {
        return false;
    }
    if (lastInput == "%" && operators.includes(value)) {
        return true;
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
