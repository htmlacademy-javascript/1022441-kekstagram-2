
function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getUniqInteger(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentKeydown = function(callback) {
  return function(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      callback();
    }
  };
};

const preventEscPropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function showSuccess(message) {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  successElement.querySelector('.success__title').textContent = message;
  const successButton = successElement.querySelector('.success__button');

  document.body.append(successElement);

  const closeSuccessWindowHandler = onDocumentKeydown(closeSuccessWindow);

  function closeSuccessWindow() {
    successElement.remove();
    document.removeEventListener('keydown', closeSuccessWindowHandler);
  }

  document.addEventListener('keydown', closeSuccessWindowHandler);

  successElement.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeSuccessWindow();
    }
  });

  successButton.addEventListener('click', () => {
    closeSuccessWindow();
  });
}

const ERROR_DISPLAY_TIME = 5000;

function showStartError(message) {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.data-error__title').textContent = message;

  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ERROR_DISPLAY_TIME);
}

function showError(message, onCloseCallback) {
  const errorTemple = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemple.cloneNode(true);
  errorElement.querySelector('.error__title').textContent = message;
  const errorButton = errorElement.querySelector('.error__button');

  document.body.append(errorElement);

  const closeErrorWindowHandler = onDocumentKeydown(closeErrorWindow);

  document.addEventListener('keydown', closeErrorWindowHandler);

  function closeErrorWindow() {
    errorElement.remove();
    document.removeEventListener('keydown', closeErrorWindowHandler);
    onCloseCallback();
  }

  errorElement.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeErrorWindow();
    }
  });

  errorButton.addEventListener('click', () => {
    closeErrorWindow();
  });
}

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInteger, getUniqInteger, getRandomArrayElement, onDocumentKeydown, preventEscPropagation, showSuccess, showStartError, showError, isEscapeKey, debounce};
