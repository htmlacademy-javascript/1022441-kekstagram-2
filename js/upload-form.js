import {preventEscPropagation, onDocumentKeydown} from './util.js';
import {uploadFormValidator, imgUploadForm, textHashtags} from './updload-form-validation.js';

const imgUploadStartInput = document.querySelector('.img-upload__start input[type=file]');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textDescription = document.querySelector('.text__description');
const imgUploadEffect = document.querySelector('.img-upload__effect-level');
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const FILE_TYPES = ['.jpg', '.jpeg', '.png'];

const docKeyDownHandler = onDocumentKeydown(closeUploadEditorWindow);

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
  textHashtags.addEventListener('keydown', preventEscPropagation);
  textDescription.addEventListener('keydown', preventEscPropagation);
  imgUploadEffect.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', docKeyDownHandler);
}

function closeUploadEditorWindow() {
  imgUploadOverlay.classList.add('hidden');
  textHashtags.removeEventListener('keydown', preventEscPropagation);
  textDescription.removeEventListener('keydown', preventEscPropagation);
  document.removeEventListener('keydown', docKeyDownHandler);
  document.body.classList.remove('modal-open');
  document.querySelector('.img-upload__input').value = '';
}

imgUploadCancel.addEventListener('click', () => {
  closeUploadEditorWindow();
});

function blockSubmitButton() {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = 'Публикую...';
}

function unblockSubmitButton() {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = 'Опубликовать';
}

function initUploadEditor() {
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

export {initUploadEditor};
