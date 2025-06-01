import { BaseMedia } from './BaseMedia.js';

export class VideoMedia extends BaseMedia {
   createMediaElement() {
      const video = document.createElement('video');
      const source = document.createElement('source');

      source.src = this.getMediaPath();
      source.type = 'video/mp4';

      video.appendChild(source);

      return video;
   }
}
