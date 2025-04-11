import { getPhotographers } from '../utils/dataService.js';
import { photographerTemplate } from '../templates/photographer.js';

function getPhotographerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

async function displayPhotographerDetails(photographers) {
   const photographersSection = document.querySelector(".photograph-header");
   const photographerId = getPhotographerIdFromURL();
   const photographerData = photographers.find(p => p.id === photographerId);
   
   if (!photographerData) {
         console.error('Photographer not found');
         return;
   }else {
      const photographerModel = photographerTemplate(photographerData);
      const userDetailsDOM = photographerModel.getUserDetailsDOM();
      photographersSection.appendChild(userDetailsDOM);
   }
   
}

   export async function init() {
   // Récupère les datas des photographes
   const photographers = await getPhotographers();
   displayPhotographerDetails(photographers);
}

   init();