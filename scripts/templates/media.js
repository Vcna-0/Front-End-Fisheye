export function mediaTemplate(mediaData, photographerData) {
   const { image, video, title, likes } = mediaData;

   const folderName = photographerData.name;
   const fileName = mediaData.image ?? mediaData.video;

   if (!fileName) {
      throw new Error(`Aucun fichier média trouvé pour: ${JSON.stringify(mediaData)}`);
   }

   const mediaSrc = `assets/medias/${folderName}/${fileName}`;

   function getMediaDOM() {
      const article = document.createElement('article');
      article.classList.add('media-card');

      const isVideo = !!mediaData.video;

      article.innerHTML = `
		<div class="media-container">
			${isVideo ? `<video controls><source src="${mediaSrc}" type="video/mp4"></video>` : `<img src="${mediaSrc}" alt="${mediaData.title}">`}
		</div>
      <h3>${mediaData.title}</h3>
      <div class="likes">
         <span>${mediaData.likes}</span>
         <i class="fas fa-heart"></i>
      </div>
   `;

      return article;
   }

   return { getMediaDOM };
}
