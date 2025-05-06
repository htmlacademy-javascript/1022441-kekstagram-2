import {preventEscPropagation, onDocumentKeydown} from './util.js';
import {uploadFormValidator, imgUploadForm, textHashtags} from './updload-form-validation.js';
import { initEffectsControls, imgUploadPreview } from './image-effects.js';

const imgUploadStartInput = document.querySelector('.img-upload__start input[type=file]');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textDescription = document.querySelector('.text__description');
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const FILE_TYPES = ['.jpg', '.jpeg', '.png'];
const BUTTON_TEXT = {
  PUBLISHING: 'Публикую...',
  PUBLISH: 'Опубликовать'
};

const docKeyDownHandler = onDocumentKeydown(closeUploadEditorWindow);

function handleFormKeydown(evt) {
  const tag = evt.target.tagName.toLowerCase();
  if ((tag === 'input' || tag === 'textarea') && evt.target !== imgUploadStartInput) {
    preventEscPropagation(evt);
  }
}

imgUploadStartInput.addEventListener('change', () => {
  const file = imgUploadStartInput.files[0];
  if (file) {
    const fileName = file.name.toLowerCase();
    const dotPosition = fileName.indexOf('.');
    if (dotPosition < 0) {
      return;
    }
    const fileExtension = fileName.substring(dotPosition);
    if (!FILE_TYPES.includes(fileExtension)) {
      return;
    }

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
  initEffectsControls();
  imgUploadForm.addEventListener('submit', (evt) => {
    const isFormValid = uploadFormValidator.validate();
    if (!isFormValid) {
      evt.preventDefault();
      return;
    }
    blockSubmitButton();
    setTimeout(() => {
      unblockSubmitButton();
      closeUploadEditorWindow();
    }, 2000);
  });
}

export {initUploadEditor, imgUploadPreview, imgUploadStartInput};
