function checkStringLength(string, maxLength) {
  return typeof string === 'string' && string.length <= maxLength;
}

function isPalindrome(string) {
  if (typeof string !== 'string') {
    return false;
  }

  const normalizedString = string.replaceAll(' ','').toLowerCase();

  for(let i = 0, j = normalizedString.length - 1; j >= 0; i++, j--) {
    if(normalizedString[i] !== normalizedString[j]) {
      return false;
    }
  }
  return true;
}

function extractNumber(string) {
  if(typeof string === 'number') {
    string = string.toString();
  } else if (typeof string !== 'string') {
    return NaN;
  }

  let digits = '';
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if(!Number.isNaN(parseInt(char, 10))) {
      digits += char;
    }
  }
  return parseInt(digits, 10);
}
