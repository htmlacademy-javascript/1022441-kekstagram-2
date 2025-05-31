import {renderFullsizePhoto} from './render-fullsize-photo.js';

const photosContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

let lastClickHandler;

const renderPhotosList = (pictures) => {
  const pictureFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.setAttribute('data-picture-id', picture.id);
    pictureFragment.appendChild(pictureElement);
  });

  photosContainer.appendChild(pictureFragment);

  if (lastClickHandler) {
    photosContainer.removeEventListener('click', lastClickHandler);
  }

  lastClickHandler = (evt) => {
    const pictureElement = evt.target.closest('[data-picture-id]');
    if (!pictureElement) {
      return;
    }
    evt.preventDefault();
    const pictureId = +(pictureElement.getAttribute('data-picture-id'));
    const clickedPicture = pictures.find((picture) => picture.id === pictureId);
    renderFullsizePhoto(clickedPicture);
  };

  photosContainer.addEventListener('click', lastClickHandler);
};

const clearPhotosList = () => {
  const usersPhotoList = document.querySelectorAll('.pictures .picture');
  usersPhotoList.forEach((picture) => {
    picture.remove();
  });
};

export {renderPhotosList, clearPhotosList};
