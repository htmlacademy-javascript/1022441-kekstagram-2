
const ERROR_DISPLAY_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const getDocumentKeydownHandler = (callback) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
};

const preventEscPropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const showSuccess = (message) => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  successElement.querySelector('.success__title').textContent = message;
  const successButton = successElement.querySelector('.success__button');

  document.body.append(successElement);

  const documentKeyDownHandler = getDocumentKeydownHandler(closeSuccessWindow);

  function closeSuccessWindow() {
    successElement.remove();
    document.removeEventListener('keydown', documentKeyDownHandler);
  }

  document.addEventListener('keydown', documentKeyDownHandler);

  successElement.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeSuccessWindow();
    }
  });

  successButton.addEventListener('click', () => {
    closeSuccessWindow();
  });
};

const showStartError = (message) => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.data-error__title').textContent = message;

  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ERROR_DISPLAY_TIME);
};

const showError = (message, onCloseCallback) => {
  const errorTemple = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemple.cloneNode(true);
  errorElement.querySelector('.error__title').textContent = message;
  const errorButton = errorElement.querySelector('.error__button');

  document.body.append(errorElement);

  const documentKeyDownHandler = getDocumentKeydownHandler(closeErrorWindow);

  document.addEventListener('keydown', documentKeyDownHandler);

  function closeErrorWindow() {
    errorElement.remove();
    document.removeEventListener('keydown', documentKeyDownHandler);
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
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getDocumentKeydownHandler, preventEscPropagation, showSuccess, showStartError, showError, isEscapeKey, debounce};
