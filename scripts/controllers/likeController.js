export class LikeController {
   constructor(mediaData, updateTotalLikes) {
      this.mediaData = mediaData;
      this.updateTotalLikes = updateTotalLikes;
      this.liked = false;
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
