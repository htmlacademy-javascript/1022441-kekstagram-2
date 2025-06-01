import {initializeUploadEditor} from './upload-form.js';
import {getData} from './api.js';
import {showStartError} from './util.js';
import {initializeView, renderView} from './view.js';

initializeUploadEditor();
getData()
  .then((data) => {
    initializeView();
    renderView(data);
  })
  .catch((err) => {
    showStartError(err.message);
  });
