export function mediaTemplate(mediaData, photographerData, index, lightbox, updateTotalLikes) {
   const { image, video, title, likes } = mediaData;

   const folderName = photographerData.name;
   const fileName = image ?? video;

   if (!fileName) {
      throw new Error(`Aucun fichier média trouvé pour: ${JSON.stringify(mediaData)}`);
   }

   const mediaSrc = `assets/medias/${folderName}/${fileName}`;

   function getMediaDOM() {
      const article = document.createElement('article');
      article.classList.add('media-card');

      const isVideo = !!video;
      let currentLikes = likes;
      let liked = false;

      article.innerHTML = `
            <div class="media-container">
            <a href="#" class="media-link" tabindex="0" aria-label="Voir ${title}">
               ${isVideo ? `<video><source src="${mediaSrc}" type="video/mp4"></video>` : `<img src="${mediaSrc}" alt="${title}">`}
               </a> 
            </div>
         <div class="media-info">
         <h3>${title}</h3>
         <div class="likes">
               <span class="likes-count">${currentLikes}</span>
               <i class="fas fa-heart like-icon" tabindex="0" aria-label="Aimer ${title}" role="button"></i>
            </div>
         </div>
      `;

      const link = article.querySelector('.media-link');

      link.addEventListener('click', (e) => {
         e.preventDefault();
         lightbox.open(index);
      });

      link.addEventListener('keydown', (e) => {
         if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            lightbox.open(index);
         }
      });

      const likeIcon = article.querySelector('.like-icon');
      const likeCount = article.querySelector('.likes-count');

      function toggleLike() {
         liked = !liked;

         if (liked) {
            mediaData.likes += 1;
         } else {
            mediaData.likes -= 1;
         }

         likeCount.textContent = mediaData.likes;
         likeIcon.classList.toggle('liked', liked);

         updateTotalLikes();
      }

      likeIcon.addEventListener('click', toggleLike);
      likeIcon.addEventListener('keydown', (e) => {
         if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleLike();
         }
      });

      return article;
   }

   return { getMediaDOM };
}
