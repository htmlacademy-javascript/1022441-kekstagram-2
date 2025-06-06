import '../vendor/nouislider/nouislider.js';
import '../vendor/nouislider/nouislider.css';

const INTEGER_PRECISION = 0;
const DECIMAL_PRECISION = 1;

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const imgUploadEffect = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

let currentEffect = '';

const effectDescriptors = {
  'none': {
    filter: 'none',
    min: 0,
    max: 1,
    step: 1,
    unit: '',
    level: 0
  },
  'chrome': {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    level: 1
  },
  'sepia': {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    level: 1
  },
  'marvin': {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    level: 100
  },
  'phobos': {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    level: 3
  },
  'heat': {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    level: 3
  },
};

const slider = noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(INTEGER_PRECISION);
      }
      return value.toFixed(DECIMAL_PRECISION);
    },
    from: (value) => parseFloat(value),
  },
});

effectLevelSlider.noUiSlider.on('update', () => {
  let effectDescriptor = effectDescriptors[currentEffect];
  if (!effectDescriptor) {
    effectDescriptor = effectDescriptors['none'];
  }
  if (effectDescriptor.filter === 'none') {
    effectLevelValue.value = '';
    imgUploadPreview.style.filter = 'none';
  } else {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    effectDescriptor.level = effectLevelValue.value;
    imgUploadPreview.style.filter = `${effectDescriptor.filter}(${effectDescriptor.level}${effectDescriptor.unit})`;
  }
});

const changeEffect = (effect) => {
  if (currentEffect === effect) {
    return;
  }
  currentEffect = effect;
  const effectDescriptor = effectDescriptors[currentEffect];
  imgUploadEffect.classList.toggle('hidden', effectDescriptor.filter === 'none');
  effectDescriptor.level = effectDescriptor.max;
  slider.updateOptions({
    range: {
      min: effectDescriptor.min,
      max: effectDescriptor.max,
    },
    start: effectDescriptor.level,
    step: effectDescriptor.step
  });
};

const initializeEffectsControls = () => {
  changeEffect(document.querySelector('.effects__list input[type="radio"]').value);
  const radios = Array.from(document.querySelectorAll('.effects__list input[type="radio"]'));
  radios.forEach((radio) => radio.addEventListener('change', (evt) => changeEffect(evt.target.value)));
};

const resetEffect = () => {
  const inputEffectNone = document.querySelector('#effect-none');
  inputEffectNone.checked = true;
  changeEffect(inputEffectNone.value);
};

export {initializeEffectsControls, imgUploadPreview, resetEffect};
