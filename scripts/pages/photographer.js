import { getPhotographers, getMedia } from '../utils/dataService.js';
import { photographerTemplate } from '../templates/photographer.js';
import { mediaTemplate } from '../templates/media.js';
import { lightboxTemplate } from '../templates/lightbox.js';
import { contactFormTemplate } from '../templates/contactForm.js';
import { displayModal } from '../utils/contactForm.js';
import { closeModal } from '../utils/contactForm.js';

function getPhotographerIdFromURL() {
   const urlParams = new URLSearchParams(window.location.search);
   return parseInt(urlParams.get('id'));
}

async function displayPhotographerDetails(photographerData) {
   const photographersSection = document.querySelector('.photograph-header');

   const photographerModel = photographerTemplate(photographerData);
   const userDetailsDOM = photographerModel.getUserDetailsDOM();
   photographersSection.appendChild(userDetailsDOM);

   const contactButton = document.querySelector('.contact_button');
   contactButton.addEventListener('click', displayModal);
}

function displayPhotographerMedia(photographerMedias, photographerData) {
   const mediaSection = document.querySelector('.photograph-media');

   const mediaListWithName = photographerMedias.map((media) => ({
      ...media,
      photographerName: photographerData.name,
   }));

   const totalLikesElement = document.querySelector('.total-likes');

   function updateTotalLikes() {
      const total = mediaListWithName.reduce((sum, media) => sum + media.likes, 0);
      totalLikesElement.textContent = total;
   }

   const lightbox = lightboxTemplate(mediaListWithName);
   lightbox.getLightboxDOM();

   // function renderMedias(photographerMedias) {
   //    mediaSection.innerHTML = '';
   //    console.log('photographerMedias', photographerMedias);

   //    photographerMedias.forEach((mediaData, index) => {
   //       const media = mediaTemplate(mediaData, photographerData, index, lightbox, updateTotalLikes);
   //       const mediaDOM = media.getMediaDOM();
   //       mediaSection.appendChild(mediaDOM);
   //    });

   //    document.querySelectorAll('.media-card img, .media-card video').forEach((el, index) => {
   //       el.addEventListener('click', () => lightbox.open(index));
   //    });
   // }

   function renderMedias(currentMediaList) {
      mediaSection.innerHTML = '';
      console.log('currentMediaList', currentMediaList);

      lightbox.updateMediaList(currentMediaList);

      currentMediaList.forEach((mediaData, index) => {
         const media = mediaTemplate(mediaData, photographerData, index, lightbox, updateTotalLikes);
         const mediaDOM = media.getMediaDOM();
         mediaSection.appendChild(mediaDOM);
      });

      document.querySelectorAll('.media-card img, .media-card video').forEach((el, index) => {
         el.addEventListener('click', () => lightbox.open(index));
      });
   }

   renderMedias(mediaListWithName);
   updateTotalLikes();

   const sortSelect = document.getElementById('sort-select');
   sortSelect.addEventListener('change', (e) => {
      const sortBy = e.target.value;

      let sortedMedias = [...mediaListWithName];

      if (sortBy === 'popularity') {
         sortedMedias.sort((a, b) => b.likes - a.likes);
      } else if (sortBy === 'date') {
         sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortBy === 'title') {
         sortedMedias.sort((a, b) => (a.title > b.title) - (a.title < b.title));
      }

      renderMedias(sortedMedias);
   });
}

export async function init() {
   const photographerId = getPhotographerIdFromURL();

   if (!photographerId) {
      console.error('Photographer ID not found in URL');
      return;
   }

   const photographers = await getPhotographers();
   const photographerData = photographers.find((p) => p.id === photographerId);

   displayPhotographerDetails(photographerData);

   const media = await getMedia();
   const photographerMedias = media.filter((m) => m.photographerId === photographerId);

   displayPhotographerMedia(photographerMedias, photographerData);

   const contactForm = contactFormTemplate(photographerData.name);
   document.body.appendChild(contactForm.getFormDOM());
   const closeBtn = document.querySelector('.close_modal');
   if (closeBtn) closeBtn.addEventListener('click', closeModal);
}

init();
