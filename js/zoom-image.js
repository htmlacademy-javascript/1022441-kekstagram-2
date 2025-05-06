import {imgUploadPreview} from './image-effects.js';

const SCALE = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const scaleControl = document.querySelector('.scale');
const scaleControlValue = scaleControl.querySelector('.scale__control--value');
const scaleControlBiggerButton = scaleControl.querySelector('.scale__control--bigger');
const scaleControlSmallerButton = scaleControl.querySelector('.scale__control--smaller');

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

function resetZoom() {
  scaleValue = SCALE.MAX;
  updateScale();
}

function initZoomControls() {
  scaleControlSmallerButton.addEventListener('click', onZoomOut);
  scaleControlBiggerButton.addEventListener('click', onZoomIn);
}

export {initZoomControls, resetZoom};
