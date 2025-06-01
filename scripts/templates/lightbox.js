export function lightboxTemplate(initialList, startIndex = 0) {
   let mediaList = initialList;
   let currentIndex = startIndex;
   let lightboxElement;

   function createLightboxElement() {
      const element = document.createElement('div');
      element.className = 'lightbox hidden';
      element.setAttribute('role', 'dialog');
      element.setAttribute('aria-hidden', 'true');
      element.setAttribute('aria-label', 'Vue agrandie du média');
      element.innerHTML = `
         <button type="button" class="lightbox-close" aria-label="Fermer la lightbox">&times;</button>
         <div class="lightbox-content">
            <button type="button" class="lightbox-prev" aria-label="Média précédent">&#10094;</button>
            <div class="lightbox-media-container"></div>
            <button type="button" class="lightbox-next" aria-label="Média suivant">&#10095;</button>
         </div>
      `;
      document.body.appendChild(element);
      return element;
   }

   function attachLightboxEvents() {
      lightboxElement.querySelector('.lightbox-close').addEventListener('click', close);
      lightboxElement.querySelector('.lightbox-next').addEventListener('click', showNext);
      lightboxElement.querySelector('.lightbox-prev').addEventListener('click', showPrev);
      document.addEventListener('keydown', handleKeydown);
   }

   function toggleVisibility(element, show) {
      element.classList.toggle('hidden', !show);
      element.setAttribute('aria-hidden', String(!show));
   }

   function open(index = 0) {
      currentIndex = index;
      updateContent();

      const main = document.querySelector('main');
      const header = document.querySelector('header');
      toggleVisibility(main, false);
      toggleVisibility(header, false);
      toggleVisibility(lightboxElement, true);
   }

   function close() {
      const main = document.querySelector('main');
      const header = document.querySelector('header');
      toggleVisibility(main, true);
      toggleVisibility(header, true);
      toggleVisibility(lightboxElement, false);
   }

   function getMediaSrc(media) {
      const fileName = media.image ?? media.video;
      return `assets/medias/${media.photographerName}/${fileName}`;
   }

   function renderMedia(container, media) {
      const src = getMediaSrc(media);
      const html = media.video
         ? `<video controls autoplay><source src="${src}" type="video/mp4"></video>`
         : `<img src="${src}" alt="${media.title}">`;
      container.innerHTML = `${html}<p>${media.title}</p>`;
   }

   function updateContent() {
      const container = lightboxElement.querySelector('.lightbox-media-container');
      const media = mediaList[currentIndex];
      renderMedia(container, media);
   }

   function showNext() {
      currentIndex = (currentIndex + 1) % mediaList.length;
      updateContent();
   }

   function showPrev() {
      currentIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
      updateContent();
   }

   function handleKeydown(e) {
      switch (e.key) {
         case 'Escape':
            return close();
         case 'ArrowRight':
            return showNext();
         case 'ArrowLeft':
            return showPrev();
      }
   }

   function updateMediaList(newList) {
      mediaList = newList;
   }

   function createLightboxDOM() {
      lightboxElement = createLightboxElement();
      attachLightboxEvents();
      return lightboxElement;
   }

   return {
      getLightboxDOM: createLightboxDOM,
      open,
      updateMediaList,
   };
}
