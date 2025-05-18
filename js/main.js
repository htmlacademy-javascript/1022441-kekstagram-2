import './zoom-image.js';
import {renderPhotosList} from './render-photos.js';
import {initUploadEditor} from './upload-form.js';
import {getData} from './api.js';
import {showError} from './util.js';

initUploadEditor();
getData()
  .then((data) => {
    renderPhotosList(data);
  })
  .catch((err) => {
    showError(err.message);
  });
