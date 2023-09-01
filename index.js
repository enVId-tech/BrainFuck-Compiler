function compileBfCode(alertMen) {
    let bfMainArray = new Array(30000).fill(0);

    let pointerIndex = 0;

    const validChars = "+-<>.,[]";
    let output = '';

    for (let i = 0; i < alertMen.length; i++) {
        if (!validChars.includes(alertMen[i])) {
            continue;
        }
        try {
            switch (alertMen[i]) {
                case ".":
                    output += String.fromCharCode(bfMainArray[pointerIndex]);
                    break;
                case "[":
                    if (bfMainArray[pointerIndex] === 0) {
                        let loopDepth = 1;
                        while (loopDepth > 0) {
                            i++;
                            if (alertMen[i] === "[") {
                                loopDepth++;
                            } else if (alertMen[i] === "]") {
                                loopDepth--;  // Decrement loopDepth for closing bracket
                            }
                        }
                    }
                    break;
                case "]": // Add this case for closing bracket
                    if (bfMainArray[pointerIndex] !== 0) {
                        let loopDepth = 1;
                        while (loopDepth > 0) {
                            i--;
                            if (alertMen[i] === "]") {
                                loopDepth++;
                            } else if (alertMen[i] === "[") {
                                loopDepth--;
                            }
                        }
                    }
                    break;
                case ">":
                    pointerIndex++;
                    break;
                case "<":
                    if (pointerIndex != 0) {
                        pointerIndex--;
                    } else {
                        throw new Error("Pointer at index of 0!")
                    };
                    break; // Don't forget the break statement here
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
            console.log(err);
        }
    }

    console.log(`Result as output is equal to ${output}`);

    document.getElementById("BFCode").innerHTML = `Result as output is equal to: ${output}`;
}

document.addEventListener("click", () => {
    var alertMen = prompt("Type in Brainfuck code.");
    compileBfCode(alertMen);
});