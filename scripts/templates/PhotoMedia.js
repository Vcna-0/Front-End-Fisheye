import { BaseMedia } from './BaseMedia.js';

export class PhotoMedia extends BaseMedia {
   createMediaElement() {
      const { title } = this.mediaData;

      const img = document.createElement('img');
      img.src = this.getMediaPath();
      img.alt = title;

      return img;
   }
}
