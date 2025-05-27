import './zoom-image.js';
import {initUploadEditor} from './upload-form.js';
import {getData} from './api.js';
import {showError} from './util.js';
import {activateView} from './view.js';

initUploadEditor();
getData()
  .then((data) => {
    activateView(data);
  })
  .catch((err) => {
    showError(err.message);
  });
