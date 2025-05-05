import {generateMoqData} from './data.js';
import {renderPhotosList} from './render-photos.js';
import { initUploadEditor } from './upload-form.js';

const data = generateMoqData();
renderPhotosList(data);

initUploadEditor();
