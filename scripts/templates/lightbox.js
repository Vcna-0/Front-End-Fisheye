export function lightboxTemplate(initialList, startIndex = 0) {
   console.log('initialList', initialList);
   let mediaList = initialList;
   let currentIndex = startIndex;
   let lightboxElement;

   function createLightboxDOM() {
      lightboxElement = document.createElement('div');
      lightboxElement.classList.add('lightbox');
      lightboxElement.classList.add('hidden');
      lightboxElement.setAttribute('aria-hidden', 'true');
      lightboxElement.setAttribute('role', 'dialog');
      lightboxElement.setAttribute('aria-label', 'Vue agrandie du média');
      lightboxElement.innerHTML = `
         <button class="lightbox-close" aria-label="Fermer la lightbox">&times;</button>
         <div class="lightbox-content">
            <button class="lightbox-prev" aria-label="Média précédent">&#10094;</button>
            <div class="lightbox-media-container"></div>
            <button class="lightbox-next" aria-label="Média suivant">&#10095;</button>
         </div>
      `;

      document.body.appendChild(lightboxElement);

      lightboxElement.querySelector('.lightbox-close').addEventListener('click', close);
      lightboxElement.querySelector('.lightbox-next').addEventListener('click', showNext);
      lightboxElement.querySelector('.lightbox-prev').addEventListener('click', showPrev);

      document.addEventListener('keydown', handleKeydown);

      return lightboxElement;
   }

   function open(index = 0) {
      currentIndex = index;
      updateContent();
      const main = document.querySelector('main');
      const header = document.querySelector('header');
      main.setAttribute('aria-hidden', 'true');
      main.classList.add('hidden');
      header.setAttribute('aria-hidden', 'true');
      header.classList.add('hidden');
      lightboxElement.setAttribute('aria-hidden', 'false');
      lightboxElement.classList.remove('hidden');
   }

   function close() {
      const main = document.querySelector('main');
      main.setAttribute('aria-hidden', 'false');
      main.classList.remove('hidden');
      const header = document.querySelector('header');
      header.setAttribute('aria-hidden', 'false');
      header.classList.remove('hidden');
      lightboxElement.setAttribute('aria-hidden', 'true');
      lightboxElement.classList.add('hidden');
   }

   function updateContent() {
      const media = mediaList[currentIndex];
      const folderName = media.photographerName;
      const fileName = media.image ?? media.video;
      const src = `assets/medias/${folderName}/${fileName}`;
      const isVideo = !!media.video;
      const container = lightboxElement.querySelector('.lightbox-media-container');

      console.log('Chargement du média depuis :', src);
      container.innerHTML = isVideo
         ? `<video controls autoplay><source src="${src}" type="video/mp4"></video><p>${media.title}</p>`
         : `<img src="${src}" alt="${media.title}"><p>${media.title}</p>`;
   }

   function showNext() {
      currentIndex = (currentIndex + 1) % mediaList.length;
      updateContent();
   }

   function showPrev() {
      currentIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
      updateContent();
   }

   function updateMediaList(newList) {
      mediaList = newList;
   }

   function handleKeydown(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
   }

   return {
      getLightboxDOM: createLightboxDOM,
      open,
      updateMediaList,
   };
}
