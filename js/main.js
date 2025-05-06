import {generateMoqData} from './data.js';
import {renderPhotosList} from './render-photos.js';
import {initUploadEditor} from './upload-form.js';
import './zoom-image.js';

const data = generateMoqData();
renderPhotosList(data);
initUploadEditor();
