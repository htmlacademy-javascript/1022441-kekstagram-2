import {renderFullsizePhoto} from './render-fullsize-photo.js';

const photosContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhotosList = (pictures) => {
  const pictureFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      renderFullsizePhoto(picture);
    });

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureFragment.appendChild(pictureElement);
  });

  photosContainer.appendChild(pictureFragment);
};

export {renderPhotosList};
