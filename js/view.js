import {debounce} from './util.js';
import {renderPhotosList, clearPhotosList} from './render-photos.js';

const NUMBER_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const imgFiltersButtons = Array.from(imgFiltersForm.querySelectorAll('.img-filters__button'));

const modeNames = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const compareComments = (photoA, photoB) => {
  const commentsCountA = photoA.comments.length;
  const commentsCountB = photoB.comments.length;

  return commentsCountB - commentsCountA;
};

const modeFilters = {
  [modeNames.DEFAULT]: (allPhotos) => allPhotos,

  [modeNames.RANDOM]: (allPhotos) => allPhotos.slice().sort(() => Math.random() - 0.5).slice(0, NUMBER_RANDOM_PHOTOS),

  [modeNames.DISCUSSED]: (allPhotos) => allPhotos.slice().sort(compareComments)
};

let currentMode;

const changeViewMode = (mode, allPhotos) => {
  if (!(mode in modeFilters)) {
    mode = modeNames.DEFAULT;
  }

  if (currentMode === mode && mode !== modeNames.RANDOM) {
    return;
  }

  currentMode = mode;

  const filteredPhotos = modeFilters[currentMode](allPhotos);
  clearPhotosList();
  renderPhotosList(filteredPhotos);
};

const initFilterButtons = () => {
  imgFiltersButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const activeButton = imgFiltersForm.querySelector('.img-filters__button--active');
      if (activeButton.id !== evt.target.id) {
        activeButton.classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
      }
    });
  });
};

const initView = () => {
  imgFilters.classList.remove('img-filters--inactive');
  initFilterButtons();
};

const renderView = (allPhotos) => {
  const onPhotosChange = (evt) => {
    const buttonId = evt.target.closest('button').id;
    changeViewMode(buttonId, allPhotos);
  };

  imgFiltersForm.addEventListener('click', debounce(onPhotosChange, RERENDER_DELAY));

  changeViewMode(modeNames.DEFAULT, allPhotos);
};

export {initView, renderView};
