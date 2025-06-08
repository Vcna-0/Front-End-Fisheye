import { getPhotographers } from '../services/dataService.js';
import { photographerTemplate } from '../templates/photographer.js';

async function displayData(allPhotographers) {
   const photographersSectionDOM = document.querySelector('.photographer_section');

   allPhotographers.forEach((photographer) => {
      const photographerModel = photographerTemplate(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSectionDOM.appendChild(userCardDOM);
   });
}

// Récupère les datas de tous les photographes
async function init() {
   const allPhotographers = await getPhotographers();
   displayData(allPhotographers);
}

init();
