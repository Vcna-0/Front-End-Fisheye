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

   createCommonElements() {
      const { title, likes } = this.mediaData;

      const article = document.createElement('article');
      article.className = 'media-card';

      const info = document.createElement('div');
      info.className = 'media-info';

      const titleEl = document.createElement('h3');
      titleEl.textContent = title;

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
      info.append(titleEl, likesContainer);

      this.setupLikeEvents(likeIcon, likeCount);

      return { article, info, likeCount, likeIcon };
   }

   setupLightboxEvents(link) {
      const open = (e) => {
         if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.lightbox.open(this.index);
         }
      };

      link.addEventListener('click', open);
      link.addEventListener('keydown', open);
   }

   setupLikeEvents(likeIcon, likeCount) {
      const toggleLike = (e) => {
         if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.liked = !this.liked;
            this.mediaData.likes += this.liked ? 1 : -1;
            likeCount.textContent = this.mediaData.likes;
            likeIcon.classList.toggle('liked', this.liked);
            this.updateTotalLikes();
         }
      };

      likeIcon.addEventListener('click', toggleLike);
      likeIcon.addEventListener('keydown', toggleLike);
   }
}
