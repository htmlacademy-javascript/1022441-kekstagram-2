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

const updateScale = () => {
  scaleControlValue.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
};

const zoomImage = (scaleStep) => {
  scaleValue = Math.min(Math.max(SCALE.MIN, scaleValue + scaleStep), SCALE.MAX);
  updateScale();
};

const zoomInClickHandler = () => {
  zoomImage(SCALE.STEP);
};

const zoomOutClickHandler = () => {
  zoomImage(-SCALE.STEP);
};

const resetZoom = () => {
  scaleValue = SCALE.MAX;
  updateScale();
};

const initializeZoomControls = () => {
  scaleControlSmallerButton.addEventListener('click', zoomOutClickHandler);
  scaleControlBiggerButton.addEventListener('click', zoomInClickHandler);
};

export {initializeZoomControls, resetZoom};
