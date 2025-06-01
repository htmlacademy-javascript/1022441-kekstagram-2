import {getDocumentKeydownHandler} from './util.js';

const COMMENTS_PAGE_SIZE = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentShown = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCommentTotal = bigPicture.querySelector('.social__comment-total-count');
const bigPictureCommentLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const documentKeyDownHandler = getDocumentKeydownHandler(closeBigPicture);
let currentPicture;

const closeButtonClickHandler = () => {
  closeBigPicture();
};

function closeBigPicture() {
  currentPicture = undefined;

  bigPictureCloseButton.removeEventListener('click', closeButtonClickHandler);
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', documentKeyDownHandler);
  document.body.classList.remove('modal-open');
}

const renderComments = (comments) => {
  const start = bigPictureCommentsList.children.length;
  const end = start + Math.min(COMMENTS_PAGE_SIZE, comments.length - start);
  if (end === comments.length) {
    bigPictureCommentLoader.classList.add('hidden');
  } else {
    bigPictureCommentLoader.classList.remove('hidden');
  }
  bigPictureCommentShown.textContent = end;

  comments.slice(start, end).forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const imageElement = document.createElement('img');
    imageElement.classList.add('social__picture');
    imageElement.src = comment.avatar;
    imageElement.alt = comment.name;
    imageElement.width = 35;
    imageElement.height = 35;
    commentElement.appendChild(imageElement);

    const textElement = document.createElement('p');
    textElement.classList.add('social__text');
    textElement.textContent = comment.message;
    commentElement.appendChild(textElement);

    bigPictureCommentsList.appendChild(commentElement);
  });
};

const renderFullsizePhoto = (picture) => {
  currentPicture = picture;

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeyDownHandler);

  bigPicture.classList.remove('hidden');
  bigPictureCloseButton.addEventListener('click', closeButtonClickHandler);

  bigPictureImage.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureDescription.textContent = picture.description;
  bigPictureCommentTotal.textContent = picture.comments.length;

  bigPictureCommentsList.innerHTML = '';

  renderComments(picture.comments);
};

bigPictureCommentLoader.addEventListener('click', () => {
  if (currentPicture) {
    renderComments(currentPicture.comments);
  }
});

export {renderFullsizePhoto};
