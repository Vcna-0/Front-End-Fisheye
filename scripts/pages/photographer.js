import { getPhotographers } from '../utils/dataService.js';
import { photographerTemplate } from '../templates/photographer.js';
import { displayModal } from '../utils/contactForm.js';

function getPhotographerIdFromURL() {
   const urlParams = new URLSearchParams(window.location.search);
   return parseInt(urlParams.get('id'));
}

async function displayPhotographerDetails(photographers) {
   const photographersSection = document.querySelector('.photograph-header');
   const photographerId = getPhotographerIdFromURL();
   const photographerData = photographers.find((p) => p.id === photographerId);

   if (!photographerData) {
      console.error('Photographer not found');
      return;
   }

   const photographerModel = photographerTemplate(photographerData);
   const userDetailsDOM = photographerModel.getUserDetailsDOM();
   photographersSection.appendChild(userDetailsDOM);

   const contactButton = document.querySelector('.contact_button');
   contactButton.addEventListener('click', displayModal);

   const mediaSection = document.querySelector('.photograph-media');
}

export async function init() {
   const photographers = await getPhotographers();
   displayPhotographerDetails(photographers);
}

init();
