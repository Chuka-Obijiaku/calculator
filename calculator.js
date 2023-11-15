const buttons = document.querySelectorAll('.btn');
const displayInput = document.querySelector('.display__input');
const displayOutput = document.querySelector('.display__output');

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
                let result = eval(input);
                
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
    let operators = ["+", "-", "*", "/"]

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
