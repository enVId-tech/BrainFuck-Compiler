def bfToPlainText(bfCode):
    output = ''
    memory = [0] * 30000
    pointer = 0

    for i in range(len(bfCode)):
        char = bfCode[i]

        if char == '>':
            pointer += 1
        elif char == '<':
            pointer -= 1
        elif char == '+':
            memory[pointer] += 1
        elif char == '-':
            memory[pointer] -= 1
        elif char == '.':
            output += chr(memory[pointer])
        elif char == ',':
            # Handle input if needed
            pass
        elif char == '[':
            if memory[pointer] == 0:
                loopCount = 1
                while loopCount > 0:
                    i += 1
                    if bfCode[i] == '[':
                        loopCount += 1
                    elif bfCode[i] == ']':
                        loopCount -= 1
        elif char == ']':
            if memory[pointer] != 0:
                loopCount = 1
                while loopCount > 0:
                    i -= 1
                    if bfCode[i] == ']':
                        loopCount += 1
                    elif bfCode[i] == '[':
                        loopCount -= 1

    return output

def runGetInput():
    bfCode = input('Enter BF code: ')
    output = bfToPlainText(bfCode)
    print(output)

runGetInput()