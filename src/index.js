module.exports = function check(str, bracketsConfig) {
  let openBrackets = bracketsConfig.reduce((result, item, index) => {
    result[index] = item[0];
    return result;
  }, []);

  let bracketsPairs = {};
  let sameBracketsPairs = [];
  for (let i = 0; i < bracketsConfig.length; i++) {
    bracketsConfig[i][1] === bracketsConfig[i][0]
      ? sameBracketsPairs.push(bracketsConfig[i][0])
      : (bracketsPairs[bracketsConfig[i][1]] = bracketsConfig[i][0]);
  }

  let stack = [];

  for (let i = 0; i < str.length; i++) {
    //идем по str

    let currentSymbol = str[i];
    let topElement = stack[stack.length - 1];

    if (sameBracketsPairs.includes(currentSymbol)) {
      // если относится к одинаковым
      if (!stack.includes(currentSymbol)) {
        // текущего символа еще нет в stack
        stack.push(currentSymbol);
      } else {
        // текущий символ уже есть в стеке
        if (topElement === currentSymbol) {
          // текущий символ совпадает с верхним
          stack.pop();
        } else {
          return false;
        }
      }
    } else {
      // если текущий символ не относится к одинаковым
      if (openBrackets.includes(currentSymbol)) {
        //проверка, текущий символ - открывающий или закрывающий
        stack.push(currentSymbol);
      } else {
        if (stack.length === 0) {
          return false;
        }
        if (bracketsPairs[currentSymbol] === topElement) {
          stack.pop();
        } else {
          return false;
        }
      }
    }
  }

  return stack.length === 0;
}
