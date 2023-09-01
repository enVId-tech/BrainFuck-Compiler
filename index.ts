function compileBfCode(bfCode: string, inputFromFunc: string): void {
    const bfMainArray: number[] = new Array(30000).fill(0);

    let data: string = bfCode;

    let pointerIndex: number = 0;
    let inputIndex: number = 0;
    const input: string = inputFromFunc;

    const validChars: string = "+-<>.,[]";
    let output: string = '';

    for (let i: number = 0; i < data.length; i++) {
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
                        let loopDepth: number = 1;
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
                case "]":
                    if (bfMainArray[pointerIndex] !== 0) {
                        let loopDepth: number = 1;
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
                    pointerIndex++;
                    break;
                case "<":
                    if (pointerIndex !== 0) {
                        pointerIndex--;
                    } else {
                        throw new Error("Pointer at index of 0!");
                    }
                    break;
                case "+":
                    bfMainArray[pointerIndex]++;
                    break;
                case "-":
                    bfMainArray[pointerIndex]--;
                    break;
                case ",":
                    // Replace 'inputIndex' with your actual implementation
                    if (inputIndex < input.length) {
                        bfMainArray[pointerIndex] = input.charCodeAt(inputIndex);
                        inputIndex++;
                    } else {
                        bfMainArray[pointerIndex] = 0;
                    }
                    break;
                default:
                    throw new Error(`Code includes an invalid character at index ${i}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    console.log(`Result as output is equal to ${output}`);

    const BFCodeElement: HTMLElement | null = document.getElementById("BFCode");
    if (BFCodeElement) {
        BFCodeElement.innerHTML = `Result as output is equal to: ${output}`;
    }
}

document.addEventListener("click", () => {
    const bfCodeInput: string | null = prompt("Type in Brainfuck code. Leave this empty if you don't need this.");
    const StringedInput: string | null = prompt("Type in any string. Leave this empty if you don't need this.")
    compileBfCode(bfCodeInput, StringedInput);

    if (bfCodeInput) {
        compileBfCode(bfCodeInput);
    }
});
