export class BaseMedia {
   constructor(mediaData, photographerData, index, lightbox, updateTotalLikes) {
      this.mediaData = mediaData;
      this.photographerData = photographerData;
      this.index = index;
      this.lightbox = lightbox;
      this.updateTotalLikes = updateTotalLikes;
      this.liked = false;
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

      const likesContainer = this.createLikesContainer(title, likes);
      info.append(titleEl, likesContainer);

      return info;
   }

   createLikesContainer(title, likes) {
      const likesContainer = document.createElement('div');
      likesContainer.className = 'likes';

      const likeCount = document.createElement('span');
      likeCount.className = 'likes-count';
      likeCount.textContent = likes;

      const likeIcon = document.createElement('i');
      likeIcon.className = 'fas fa-heart like-icon';
      likeIcon.tabIndex = 0;
      likeIcon.setAttribute('aria-label', `Aimer ${title}`);
      likeIcon.setAttribute('role', 'button');

      likesContainer.append(likeCount, likeIcon);
      this.setupLikeEvents(likeIcon, likeCount);

      return likesContainer;
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

   setupLikeEvents(likeIcon, likeCount) {
      const handleToggleLike = (e) => {
         if (this.isValidInteraction(e)) {
            e.preventDefault();
            this.toggleLike(likeCount, likeIcon);
         }
      };

      likeIcon.addEventListener('click', handleToggleLike);
      likeIcon.addEventListener('keydown', handleToggleLike);
   }

   toggleLike(likeCount, likeIcon) {
      this.liked = !this.liked;
      this.mediaData.likes += this.liked ? 1 : -1;
      likeCount.textContent = this.mediaData.likes;
      likeIcon.classList.toggle('liked', this.liked);
      this.updateTotalLikes();
   }

   isValidInteraction(e) {
      return e.type === 'click' || e.key === 'Enter' || e.key === ' ';
   }
}
