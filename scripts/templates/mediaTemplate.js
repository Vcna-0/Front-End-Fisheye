import { LikeController } from '../controllers/likeController.js';

export class mediaTemplate {
   constructor(mediaData, photographerData, index, lightbox, updateTotalLikes) {
      this.mediaData = mediaData;
      this.photographerData = photographerData;
      this.index = index;
      this.lightbox = lightbox;
      this.updateTotalLikes = updateTotalLikes;
      this.likeController = new LikeController(mediaData, updateTotalLikes);
   }

   getMediaPath() {
      const fileName = this.mediaData.image ?? this.mediaData.video;
      return `assets/medias/${this.photographerData.name}/${fileName}`;
   }

   createMediaElement() {
      throw new Error('createMediaElement must be implemented by subclass');
   }

   createMediaContainer() {
      const { title } = this.mediaData;

      const wrapper = document.createElement('div');
      wrapper.className = 'media-container';

      const link = document.createElement('a');
      link.href = '#';
      link.className = 'media-link';
      link.tabIndex = 0;
      link.setAttribute('aria-label', `Voir ${title}`);

      const mediaElement = this.createMediaElement();
      link.appendChild(mediaElement);
      wrapper.appendChild(link);

      this.setupLightboxEvents(link);

      return wrapper;
   }

   createInfoSection() {
      const { title, likes } = this.mediaData;

      const info = document.createElement('div');
      info.className = 'media-info';

      const titleEl = document.createElement('h3');
      titleEl.textContent = title;

      const likesContainer = this.likeController.createLikesContainer(title, likes);
      info.append(titleEl, likesContainer);

      return info;
   }

   getMediaDOM() {
      const article = document.createElement('article');
      article.className = 'media-card';

      const mediaContainer = this.createMediaContainer();
      const infoSection = this.createInfoSection();

      article.append(mediaContainer, infoSection);

      return article;
   }

   setupLightboxEvents(link) {
      const handleOpen = (e) => {
         if (this.isValidInteraction(e)) {
            e.preventDefault();
            this.lightbox.open(this.index);
         }
      };

      link.addEventListener('click', handleOpen);
      link.addEventListener('keydown', handleOpen);
   }

   isValidInteraction(e) {
      return e.type === 'click' || e.key === 'Enter' || e.key === ' ';
   }
}
