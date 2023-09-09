function bfToJs(bfCode) {
  let jsCode = `
      let memory = new Uint8Array(30000);
      let pointer = 0;
      
      function bfInterpreter() {
        let output = '';
        let input = '';
  
        ${bfCode.split('').map(convertBfToJs).join('')}
        
        return output;
      }
      
      bfInterpreter();
    `;

  return jsCode;
}

function convertBfToJs(char) {
  switch (char) {
    case '>':
      return 'pointer++;';
    case '<':
      return 'pointer--;';
    case '+':
      return 'memory[pointer]++;';
    case '-':
      return 'memory[pointer]--;';
    case '.':
      return 'output += String.fromCharCode(memory[pointer]);';
    case ',':
      return '/* code for input */';
    case '[':
      return 'while (memory[pointer] !== 0) {';
    case ']':
      return '}';
    default:
      return '';
  }
}

function runGetInput() {
  const bfCodeInput = document.getElementById("input").value;
  const StringedInput = document.getElementById("input2").value;
  document.getElementById("BFCode").innerHTML = `Result as output is equal to: ${bfToJs(bfCodeInput)}`;
}