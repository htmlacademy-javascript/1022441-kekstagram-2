import {preventEscPropagation, isEscapeKey, showSuccess, showError} from './util.js';
import {uploadFormValidator, imgUploadForm, textHashtags} from './updload-form-validation.js';
import {initEffectsControls, resetEffect} from './image-effects.js';
import {initZoomControls, resetZoom} from './zoom-image.js';
import {sendData} from './api.js';

const imgUploadStartInput = document.querySelector('.img-upload__start input[type=file]');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textDescription = document.querySelector('.text__description');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = Array.from(document.querySelectorAll('.effects__preview'));


const FILE_TYPES = ['.jpg', '.jpeg', '.png'];
const BUTTON_TEXT = {
  PUBLISHING: 'Публикую...',
  PUBLISH: 'Опубликовать'
};

let errorMessageHidden = true;

function docKeyDownHandler(evt) {
  if (isEscapeKey(evt) && errorMessageHidden) {
    closeUploadEditorWindow();
  }
}

function handleFormKeydown(evt) {
  if (evt.target === textHashtags || evt.target === textDescription) {
    preventEscPropagation(evt);
  }
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
    if (!FILE_TYPES.includes(fileExtension)) {
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

function openUploadEditorWindow() {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', docKeyDownHandler);
  imgUploadForm.addEventListener('keydown', handleFormKeydown);
  resetZoom();
  resetEffect();
}

function closeUploadEditorWindow() {
  imgUploadForm.removeEventListener('keydown', handleFormKeydown);
  document.removeEventListener('keydown', docKeyDownHandler);
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.querySelector('.img-upload__input').value = '';
}

imgUploadCancel.addEventListener('click', () => {
  closeUploadEditorWindow();
});

function blockSubmitButton() {
  imgUploadSubmit.innerText = BUTTON_TEXT.PUBLISHING;
  imgUploadSubmit.disabled = true;
}

function unblockSubmitButton() {
  imgUploadSubmit.innerText = BUTTON_TEXT.PUBLISH;
  imgUploadSubmit.disabled = false;
}

function initUploadEditor() {
  initZoomControls();
  initEffectsControls();
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isFormValid = uploadFormValidator.validate();
    if (!isFormValid) {
      return;
    }
    blockSubmitButton();
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
        unblockSubmitButton();
      });
  });
}

export { initUploadEditor, imgUploadStartInput };
