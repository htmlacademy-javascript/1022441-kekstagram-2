import {getRandomInteger, getUniqInteger} from './util.js';

const COMMENTORS = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

function getRandomComments(uniqCommentId) {
  function getMessage() {
    const a = getRandomInteger(0, COMMENTS.length - 1);
    const b = getRandomInteger(0, COMMENTS.length - 1);
    return a === b ? COMMENTS[a] : `${ COMMENTS[a] } ${ COMMENTS[b] }`;
  }

  const comments = [];
  const numOfComments = getRandomInteger(0, 30);
  for (let i = 0; i < numOfComments; i++) {
    const commentorId = getRandomInteger(1, COMMENTORS.length);
    comments.push({
      id: uniqCommentId(),
      avatar: `img/avatar-${commentorId}.svg`,
      message: getMessage(),
      name: COMMENTORS[commentorId - 1],
    });
  }
  return comments;
}

const ELEMENTS_COUNT = 25;

function generateMoqData() {
  const uniqCommentId = getUniqInteger(1, 100_000);
  const uniqPictureId = getUniqInteger(1, ELEMENTS_COUNT);

  function createData() {
    const id = uniqPictureId();
    return {
      id: id,
      url: `photos/${id}.jpg`,
      description: `description-${id}`,
      likes: getRandomInteger(15, 200),
      comments: getRandomComments(uniqCommentId)
    };
  }

  return Array.from({length: ELEMENTS_COUNT}, createData);
}

export {generateMoqData};
