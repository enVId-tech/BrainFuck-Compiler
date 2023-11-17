function bfToPlainText(bfCode) {
    let output = '';
    let memory = new Uint8Array(30000);
    let pointer = 0;

    for (let i = 0; i < bfCode.length; i++) {
        let char = bfCode[i];

        switch (char) {
            case '>':
                pointer++;
                break;
            case '<':
                pointer--;
                break;
            case '+':
                memory[pointer]++;
                break;
            case '-':
                memory[pointer]--;
                break;
            case '.':
                output += String.fromCharCode(memory[pointer]);
                break;
            case ',':
                // Handle input if needed
                break;
            case '[':
                if (memory[pointer] === 0) {
                    let loopCount = 1;
                    while (loopCount > 0) {
                        i++;
                        if (bfCode[i] === '[') loopCount++;
                        else if (bfCode[i] === ']') loopCount--;
                    }
                }
                break;
            case ']':
                if (memory[pointer] !== 0) {
                    let loopCount = 1;
                    while (loopCount > 0) {
                        i--;
                        if (bfCode[i] === ']') loopCount++;
                        else if (bfCode[i] === '[') loopCount--;
                    }
                }
                break;
        }
    }

    return output;
}

function runGetInput() {
    const bfCodeInput = document.getElementById("input").value;
    const StringedInput = document.getElementById("input2").value;
    document.getElementById("BFCode").innerHTML = `Result as output is equal to: ${bfToPlainText(bfCodeInput)}`;
}