import {preventEscPropagation, isEscapeKey, showSuccess, showError} from './util.js';
import {uploadFormValidator, imgUploadForm, textHashtags} from './upload-form-validation.js';
import {initializeEffectsControls, resetEffect} from './image-effects.js';
import {initializeZoomControls, resetZoom} from './zoom-image.js';
import {sendData} from './api.js';

const EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const BUTTON_TEXT = {
  PUBLISHING: 'Публикую...',
  PUBLISH: 'Опубликовать'
};

const imgUploadStartInput = document.querySelector('.img-upload__start input[type=file]');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textDescription = document.querySelector('.text__description');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = Array.from(document.querySelectorAll('.effects__preview'));

let errorMessageHidden = true;

const documentKeyDownHandler = (evt) => {
  if (isEscapeKey(evt) && errorMessageHidden) {
    closeUploadEditorWindow();
  }
};

const formKeyDownHandler = (evt) => {
  if (evt.target === textHashtags || evt.target === textDescription) {
    preventEscPropagation(evt);
  }
};

const openUploadEditorWindow = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeyDownHandler);
  imgUploadForm.addEventListener('keydown', formKeyDownHandler);
  resetZoom();
  resetEffect();
};

function closeUploadEditorWindow() {
  imgUploadForm.removeEventListener('keydown', formKeyDownHandler);
  document.removeEventListener('keydown', documentKeyDownHandler);
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.querySelector('.img-upload__input').value = '';
}

imgUploadStartInput.addEventListener('change', () => {
  const file = imgUploadStartInput.files[0];
  if (file) {
    const fileName = file.name.toLowerCase();
    const dotPosition = fileName.lastIndexOf('.');
    if (dotPosition < 0) {
      return;
    }
    const fileExtension = fileName.substring(dotPosition);
    if (!EXTENSIONS.includes(fileExtension)) {
      return;
    }

    imgUploadPreview.src = URL.createObjectURL(file);

    const imageUrl = `url(${imgUploadPreview.src})`;
    effectsPreviews.forEach((photo) => {
      photo.style.backgroundImage = imageUrl;
    });

    textDescription.value = '';
    textHashtags.value = '';
    uploadFormValidator.reset();

    openUploadEditorWindow();
  }
});

imgUploadCancel.addEventListener('click', () => {
  closeUploadEditorWindow();
});

const updateSubmitButton = (disabled) => {
  imgUploadSubmit.innerText = disabled ? BUTTON_TEXT.PUBLISHING : BUTTON_TEXT.PUBLISH;
  imgUploadSubmit.disabled = disabled;
};

const initializeUploadEditor = () => {
  initializeZoomControls();
  initializeEffectsControls();
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isFormValid = uploadFormValidator.validate();
    if (!isFormValid) {
      return;
    }
    updateSubmitButton(true);
    sendData(new FormData(evt.target))
      .then(() => {
        closeUploadEditorWindow();
        showSuccess('Изображение успешно загружено');
      })
      .catch((error) => {
        errorMessageHidden = false;
        showError(error.message, () => {
          errorMessageHidden = true;
        });
      })
      .finally(() => {
        updateSubmitButton(false);
      });
  });
};

export {initializeUploadEditor, imgUploadStartInput};
