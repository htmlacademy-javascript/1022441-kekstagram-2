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

function checkPeriod(startTime, endTime, meetingStart, meetingLength) {

  function convertToMinutes(time) {
    if (typeof time !== 'string') {
      return NaN;
    }
    const timeArr = time.split(':');
    if (timeArr.length !== 2) {
      return NaN;
    }
    let v = Number(timeArr[0]);
    if (isNaN(v) || !Number.isInteger(v)) {
      return NaN;
    }

    let timeValue = v * 60;

    v = Number(timeArr[1]);
    if (isNaN(v) || !Number.isInteger(v)) {
      return NaN;
    }
    timeValue += v;
    return timeValue;
  }

  if (!Number.isInteger(meetingLength)) {
    return false;
  }
  const timeStart = convertToMinutes(startTime);
  if (isNaN(timeStart)) {
    return false;
  }
  const timeEnd = convertToMinutes(endTime);
  if (isNaN(timeEnd)) {
    return false;
  }
  const timeMeetingStart = convertToMinutes(meetingStart);
  if (isNaN(timeMeetingStart)) {
    return false;
  }
  return timeMeetingStart >= timeStart && timeMeetingStart + meetingLength <= timeEnd;
}

checkPeriod('08:00', '17:30', '14:00', 90); // true
checkPeriod('8:0', '10:0', '8:0', 120); // true
checkPeriod('08:00', '14:30', '14:00', 90); // false
checkPeriod('14:00', '17:30', '08:0', 90); // false
checkPeriod('8:00', '17:30', '08:00', 900); // false
