import {imgUploadStartInput, imgUploadPreview} from './upload-form.js';

const SCALE = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');

let scaleValue = SCALE.MAX;

const updateScale = function() {
  scaleControlValue.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
};

const zoomImage = function(scaleStep) {
  scaleValue = Math.min(Math.max(SCALE.MIN, scaleValue + scaleStep), SCALE.MAX);
  updateScale();
};

const onZoomIn = function() {
  zoomImage(SCALE.STEP);
};

const onZoomOut = function() {
  zoomImage(-SCALE.STEP);
};

imgUploadStartInput.addEventListener('change', () => {
  scaleValue = SCALE.MAX;
  updateScale();
});

scaleControlSmallerButton.addEventListener('click', onZoomOut);
scaleControlBiggerButton.addEventListener('click', onZoomIn);
