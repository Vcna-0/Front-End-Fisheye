import { getPhotographers, getMedia } from '../utils/dataService.js';
import { photographerTemplate } from '../templates/photographer.js';
import { mediaTemplate } from '../templates/media.js';
import { displayModal } from '../utils/contactForm.js';

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

   photographerMedias.forEach((mediaData) => {
      const media = mediaTemplate(mediaData, photographerData);
      const mediaDOM = media.getMediaDOM();
      mediaSection.appendChild(mediaDOM);
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
   const photographerMedias = media.filter((media) => media.photographerId === photographerId);
   displayPhotographerMedia(photographerMedias, photographerData);
}

init();
