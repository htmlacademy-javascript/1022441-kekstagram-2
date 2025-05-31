import '../vendor/pristine/pristine.min.js';

const HASHTAG_REX_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_MAX_COUNT = 5;

const isHashtagValid = (hashtag) => hashtag.trim() === '' || HASHTAG_REX_EXP.test(hashtag);

const validateHashtags = (hashtagsString) => hashtagsString.trim().split(' ').every(isHashtagValid);

const validateHashtagsDuplicates = (hashtagsString) => {
  const hashtags = hashtagsString.trim().toLowerCase().split(/\s+/);
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtagsCount = (hashtagsString) => {
  const hashtags = hashtagsString.trim().split(/\s+/);
  return hashtags.length <= HASHTAGS_MAX_COUNT;
};

const textHashtags = document.querySelector('.text__hashtags');
const imgUploadForm = document.querySelector('.img-upload__form');

const uploadFormValidator = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

uploadFormValidator.addValidator(textHashtags, validateHashtags, 'Введен неправильный хештег');
uploadFormValidator.addValidator(textHashtags, validateHashtagsDuplicates, 'Хэштеги повторяются');
uploadFormValidator.addValidator(textHashtags, validateHashtagsCount, `Максимальное количество хэштегов - ${HASHTAGS_MAX_COUNT}`);

export {uploadFormValidator, imgUploadForm, textHashtags};
