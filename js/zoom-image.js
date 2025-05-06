import {imgUploadStartInput, imgUploadPreview} from './upload-form.js';

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');

let scaleValue = SCALE_MAX;

const updateScale = function() {
  scaleControlValue.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
};

const zoomImage = function(scaleStep) {
  scaleValue = Math.min(Math.max(SCALE_MIN, scaleValue + scaleStep), SCALE_MAX);
  updateScale();
};

const onZoomIn = function() {
  zoomImage(SCALE_STEP);
};

const onZoomOut = function() {
  zoomImage(-SCALE_STEP);
};

imgUploadStartInput.addEventListener('change', () => {
  scaleValue = SCALE_MAX;
  updateScale();
});

scaleControlSmallerButton.addEventListener('click', onZoomOut);
scaleControlBiggerButton.addEventListener('click', onZoomIn);
