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

// Строка короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false

extractNumber('2023 год'); // 2023
extractNumber('ECMAScript 2022'); // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007'); // 7
extractNumber('а я томат'); // NaN
extractNumber(2023); // 2023
extractNumber(-1); // 1
extractNumber(1.5); // 15
