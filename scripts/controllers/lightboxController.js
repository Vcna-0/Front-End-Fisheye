import { createLightboxDOM } from '../templates/lightboxTemplate.js';

export function createLightbox(initialList, startIndex = 0) {
   let mediaList = initialList;
   let currentIndex = startIndex;

   const lightboxElement = createLightboxDOM();
   const mediaContainer = lightboxElement.querySelector('.lightbox-media-container');
   const closeButton = lightboxElement.querySelector('.lightbox-close');
   const nextButton = lightboxElement.querySelector('.lightbox-next');
   const prevButton = lightboxElement.querySelector('.lightbox-prev');

   // Ajout au DOM
   document.body.appendChild(lightboxElement);

   // Gestion des événements
   closeButton.addEventListener('click', close);
   nextButton.addEventListener('click', showNext);
   prevButton.addEventListener('click', showPrev);
   document.addEventListener('keydown', handleKeydown);

   function toggleElementVisibility(element, isVisible, useHiddenClass = false) {
      if (!element) return;

      if (useHiddenClass) {
         element.classList.toggle('hidden', !isVisible);
      } else {
         element.style.display = isVisible ? '' : 'none';
      }

      element.setAttribute('aria-hidden', String(!isVisible));
   }

   function open(index = 0) {
      currentIndex = index;
      updateContent();

      const main = document.querySelector('main');
      const header = document.querySelector('header');

      toggleElementVisibility(main, false);
      toggleElementVisibility(header, false);
      toggleElementVisibility(lightboxElement, true, true);
   }

   function close() {
      const main = document.querySelector('main');
      const header = document.querySelector('header');

      toggleElementVisibility(main, true);
      toggleElementVisibility(header, true);
      toggleElementVisibility(lightboxElement, false, true);
   }

   function getMediaSrc(media) {
      const fileName = media.image ?? media.video;
      return `assets/medias/${media.photographerName}/${fileName}`;
   }

   function renderMedia(media) {
      const src = getMediaSrc(media);
      const html = media.video
         ? `<video controls autoplay><source src="${src}" type="video/mp4"></video>`
         : `<img src="${src}" alt="${media.title}">`;
      mediaContainer.innerHTML = `${html}<p>${media.title}</p>`;
   }

   function updateContent() {
      const media = mediaList[currentIndex];
      renderMedia(media);
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
            close();
            break;
         case 'ArrowRight':
            showNext();
            break;
         case 'ArrowLeft':
            showPrev();
            break;
      }
   }

   function updateMediaList(newList) {
      mediaList = newList;
   }

   return {
      getDOM: () => lightboxElement,
      open,
      close,
      updateMediaList,
   };
}
