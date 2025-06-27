import { mediaTemplate } from './mediaTemplate.js';

export class PhotoMedia extends mediaTemplate {
   createMediaElement() {
      const { title } = this.mediaData;

      const img = document.createElement('img');
      img.src = this.getMediaPath();
      img.alt = title;

      return img;
   }
}
