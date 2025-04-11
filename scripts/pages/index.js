import { getPhotographers } from '../utils/dataService.js';
import { photographerTemplate } from '../templates/photographer.js';

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// Récupère les datas des photographes
async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
}

init();
    
