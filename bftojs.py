def bfToJs(bfCode):
  jsCode = """
      let memory = new Uint8Array(30000);
      let pointer = 0;
      
      function bfInterpreter() {
        let output = '';
        let input = '';

        {}
        
        return output;
      }
      
      bfInterpreter();
    """.format(
        ''.join([convertBfToJs(c) for c in bfCode])
    )

  return jsCode

def convertBfToJs(char):
  switcher = {
    '>': 'pointer++;',
    '<': 'pointer--;',
    '+': 'memory[pointer]++;',
    '-': 'memory[pointer]--;',
    '.': 'output += String.fromCharCode(memory[pointer]);',
    ',': '/* code for input */',
    '[': 'while (memory[pointer] !== 0) {',
    ']': '}',
  }
  return switcher.get(char, '')

def runGetInput():
  bfCode = input('Enter BF code: ')
  jsCode = bfToJs(bfCode)
  print(jsCode)

runGetInput()