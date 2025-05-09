import { BaseMedia } from './BaseMedia.js';

export class VideoMedia extends BaseMedia {
   getMediaDOM() {
      const { title } = this.mediaData;
      const { article, info } = this.createCommonElements();

      const wrapper = document.createElement('div');
      wrapper.className = 'media-container';

      const link = document.createElement('a');
      link.href = '#';
      link.className = 'media-link';
      link.tabIndex = 0;
      link.setAttribute('aria-label', `Voir ${title}`);

      const video = document.createElement('video');
      const source = document.createElement('source');
      source.src = this.getMediaPath();
      source.type = 'video/mp4';

      video.appendChild(source);
      link.appendChild(video);
      wrapper.appendChild(link);
      article.append(wrapper, info);

      this.setupLightboxEvents(link);

      return article;
   }
}
