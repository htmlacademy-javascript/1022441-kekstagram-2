import {debounce} from './util';
import {renderPhotosList, clearPhotosList} from './render-photos';

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

const modeFilters = {
  [modeNames.DEFAULT]: function (allPhotos) {
    return allPhotos;
  },

  [modeNames.RANDOM]: function (allPhotos) {
    return allPhotos.slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, NUMBER_RANDOM_PHOTOS);
  },

  [modeNames.DISCUSSED]: function (allPhotos) {

    function compareComments(photoA, photoB) {
      const commentsCountA = photoA.comments.length;
      const commentsCountB = photoB.comments.length;

      return commentsCountB - commentsCountA;
    }

    return allPhotos.slice()
      .sort(compareComments);
  }
};

let currentMode;

function changeViewMode(mode, allPhotos) {
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
}

function activateView(allPhotos) {
  imgFilters.classList.remove('img-filters--inactive');
  imgFiltersButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const activeButton = imgFiltersForm.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    });
  });

  function onPhotosChange(evt) {
    changeViewMode(evt.target.id, allPhotos);
  }

  imgFiltersForm.addEventListener('click', debounce(onPhotosChange, RERENDER_DELAY));

  changeViewMode(modeNames.DEFAULT, allPhotos);
}

export {activateView};
