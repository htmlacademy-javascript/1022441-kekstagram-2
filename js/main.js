import {initUploadEditor} from './upload-form.js';
import {getData} from './api.js';
import {showStartError} from './util.js';
import {initView, renderView} from './view.js';

initUploadEditor();
getData()
  .then((data) => {
    initView();
    renderView(data);
  })
  .catch((err) => {
    showStartError(err.message);
  });
