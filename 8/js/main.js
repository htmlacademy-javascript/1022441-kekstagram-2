import {generateMoqData} from './data.js';
import {renderPhotosList} from './render-photos.js';

const data = generateMoqData();
renderPhotosList(data);
