import './zoom-image.js';
import {initUploadEditor} from './upload-form.js';
import {getData} from './api.js';
import {showStartError} from './util.js';
import {activateView} from './view.js';

initUploadEditor();
getData()
  .then((data) => {
    activateView(data);
  })
  .catch((err) => {
    showStartError(err.message);
  });
