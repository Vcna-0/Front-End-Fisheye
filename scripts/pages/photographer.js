import { getPhotographers, getMedia } from '../services/dataService.js';
import { photographerTemplate } from '../templates/photographerTemplate.js';
import { mediaFactory } from '../templates/mediaFactory.js';
import { createLightbox } from '../controllers/lightboxController.js';
import { contactFormTemplate } from '../templates/contactFormTemplate.js';
import { displayModal, closeModal } from '../controllers/modalController.js';

let currentMediaList = [];
let currentPhotographerData = null;
let currentLightbox = null;

function renderMedia(mediaList) {
   renderMediaGallery(mediaList, currentPhotographerData, currentLightbox, () => updateTotalLikes(mediaList));
   updateTotalLikes(mediaList);
}

function getPhotographerIdFromURL() {
   const urlParams = new URLSearchParams(window.location.search);
   return parseInt(urlParams.get('id'));
}

function renderPhotographerHeader(photographerData) {
   const headerSection = document.querySelector('.photograph-header');
   const photographerModel = photographerTemplate(photographerData);
   const userDetailsDOM = photographerModel.getUserDetailsDOM();
   headerSection.appendChild(userDetailsDOM);

   const contactButton = document.querySelector('.contact_button');
   if (!contactButton) return;
   contactButton.addEventListener('click', () => {
      displayModal();
   });
}

function enrichMediaList(mediaList, photographerName) {
   return mediaList.map((media) => ({
      ...media,
      photographerName,
   }));
}

function sortMediaList(mediaList, sortBy) {
   const sorted = [...mediaList];
   switch (sortBy) {
      case 'popularity':
         return sorted.sort((a, b) => b.likes - a.likes);
      case 'date':
         return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'title':
         return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
         return sorted;
   }
}

function setupSortListener() {
   const sortSelect = document.getElementById('sort-select');
   if (!sortSelect) return;

   sortSelect.addEventListener('change', (e) => {
      const sorted = sortMediaList(currentMediaList, e.target.value);
      renderMedia(sorted);
   });
}

function updateTotalLikes(mediaList) {
   const totalLikes = mediaList.reduce((sum, media) => sum + media.likes, 0);
   const likesElement = document.querySelector('.total-likes');
   if (likesElement) likesElement.textContent = totalLikes;
}

function renderMediaGallery(mediaList, photographerData, lightboxInstance, updateLikes) {
   const mediaSection = document.querySelector('.photograph-media');
   mediaSection.innerHTML = '';
   lightboxInstance.updateMediaList(mediaList);

   mediaList.forEach((mediaData, index) => {
      const media = mediaFactory(mediaData, photographerData, index, lightboxInstance, updateLikes);
      mediaSection.appendChild(media.getMediaDOM());
   });

   document.querySelectorAll('.media-card img, .media-card video').forEach((el, index) => {
      el.addEventListener('click', () => lightboxInstance.open(index));
   });
}

function setupPhotographerMedia(mediaList, photographerData) {
   currentMediaList = enrichMediaList(mediaList, photographerData.name);
   currentPhotographerData = photographerData;
   currentLightbox = createLightbox(currentMediaList);
   document.body.appendChild(currentLightbox.getDOM());

   renderMedia(currentMediaList);
   setupSortListener();
}

function setupContactForm(photographerName) {
   const formWrapper = contactFormTemplate(photographerName);
   const formDOM = formWrapper.getFormDOM();
   document.body.appendChild(formDOM);

   const closeButton = formDOM.querySelector('.close_modal');
   closeButton.addEventListener('click', closeModal);

   const form = formDOM.querySelector('form');
   form.addEventListener('submit', function (event) {
      event.preventDefault();

      const prenom = form.querySelector('#prenom').value;
      const nom = form.querySelector('#nom').value;
      const email = form.querySelector('#email').value;
      const message = form.querySelector('#message').value;

      console.log('Prénom :', prenom);
      console.log('Nom :', nom);
      console.log('Email :', email);
      console.log('Message :', message);

      closeModal();
      form.reset();
      alert(`Merci ${prenom} ${nom}, votre message a été envoyé !`);
   });
}

export async function init() {
   const photographerId = getPhotographerIdFromURL();
   if (!photographerId) return console.error('Photographer ID not found in URL');

   const photographers = await getPhotographers();
   const photographerData = photographers.find((p) => p.id === photographerId);
   if (!photographerData) return console.error('Photographer not found');

   renderPhotographerHeader(photographerData);

   const allMedia = await getMedia();
   const photographerMedia = allMedia.filter((m) => m.photographerId === photographerId);
   setupPhotographerMedia(photographerMedia, photographerData);

   setupContactForm(photographerData.name);
}

init();
