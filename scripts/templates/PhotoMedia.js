import { BaseMedia } from './BaseMedia.js';

export class PhotoMedia extends BaseMedia {
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

      const img = document.createElement('img');
      img.src = this.getMediaPath();
      img.alt = title;

      link.appendChild(img);
      wrapper.appendChild(link);
      article.append(wrapper, info);

      this.setupLightboxEvents(link);

      return article;
   }
}
