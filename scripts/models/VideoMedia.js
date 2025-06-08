import { mediaTemplate } from '../templates/mediaTemplate.js';

export class VideoMedia extends mediaTemplate {
   createMediaElement() {
      const video = document.createElement('video');
      const source = document.createElement('source');

      source.src = this.getMediaPath();
      source.type = 'video/mp4';

      video.appendChild(source);

      return video;
   }
}
