function compileBfCode(bfCode, inputFromFunc) {
    let bfMainArray = new Array(30000).fill(0);

    const data = bfCode;

    let pointerIndex = 0;
    let inputIndex = 0;
    const input = inputFromFunc;

    const validChars = "+-<>.,[]";
    let output = '';

    for (let i = 0; i < data.length; i++) {
        if (!validChars.includes(data[i])) {
            continue;
        }
        try {
            switch (data[i]) {
                case ".":
                    output += String.fromCharCode(bfMainArray[pointerIndex]);
                    break;
                case "[":
                    if (bfMainArray[pointerIndex] === 0) {
                        let loopDepth = 1;
                        while (loopDepth > 0) {
                            i++;
                            if (data[i] === "[") {
                                loopDepth++;
                            } else if (data[i] === "]") {
                                loopDepth--;
                            }
                        }
                    }
                    break;
                case "]": // Add this case for closing bracket
                    if (bfMainArray[pointerIndex] !== 0) {
                        let loopDepth = 1;
                        while (loopDepth > 0) {
                            i--;
                            if (data[i] === "]") {
                                loopDepth++;
                            } else if (data[i] === "[") {
                                loopDepth--;
                            }
                        }
                    }
                    break;
                case ">":
                    if (pointerIndex < bfMainArray.length) {
                        pointerIndex++;
                    } else {
                        throw new Error("You are at index 30000. You cannot go to a higher index than this!")
                    }
                    break;
                case "<":
                    if (pointerIndex > 0) {
                        pointerIndex--;
                    } else {
                        throw new Error("Pointer at index of 0! Cannot have a negative index!")
                    };
                    break;
                case "+":
                    bfMainArray[pointerIndex]++;
                    break;
                case "-":
                    bfMainArray[pointerIndex]--;
                    break;
                case ",":
                    if (inputIndex < input.length) {
                        bfMainArray[pointerIndex] = input.charCodeAt(inputIndex);
                        inputIndex++;
                    } else {
                        bfMainArray[pointerIndex] = 0;
                    }
                default:
                    throw new Error(`Code includes an invalid character at index ${i}`);
            }
        } catch (err) {
            console.error(err);
            break;
        }
    }

    console.log(`%cResult as output is equal to ${output}`, 'color: green');

    document.getElementById("BFCode").innerHTML = `Result as output is equal to: ${output}`;
}

function runGetInput() {
    const bfCodeInput = document.getElementById("input").value;
    const StringedInput = document.getElementById("input2").value;
    compileBfCode(bfCodeInput, StringedInput)
}