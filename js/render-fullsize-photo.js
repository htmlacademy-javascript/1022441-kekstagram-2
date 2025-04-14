import { onDocumentKeydown } from './util';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentTotal = bigPicture.querySelector('.social__comment-total-count');
const bigPictureCommentLoader = bigPicture.querySelector('.comments-loader');
const bigPictureСommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const docKeyDownHandler = onDocumentKeydown(handleClose);

function handleClose() {
  bigPictureCloseButton.removeEventListener('click', handleClose);
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', docKeyDownHandler);
  document.body.classList.remove('modal-open');
}

const renderFullsizePhoto = function(picture) {
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', docKeyDownHandler);

  bigPicture.classList.remove('hidden');
  bigPictureCloseButton.addEventListener('click', handleClose);

  bigPictureImage.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureDescription.textContent = picture.description;
  bigPictureCommentTotal.textContent = picture.comments.length;

  bigPictureCommentsCount.classList.add('hidden');
  bigPictureCommentLoader.classList.add('hidden');

  renderComments(picture.comments);
};

function renderComments(comments) {
  bigPictureСommentsList.innerHTML = '';

  comments.forEach((comment) => {
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

    bigPictureСommentsList.appendChild(commentElement);
  });
}

export {renderFullsizePhoto};
