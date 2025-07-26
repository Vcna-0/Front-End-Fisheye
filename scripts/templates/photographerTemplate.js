export function photographerTemplate(dataPhotographer) {
   const { name, id, city, country, tagline, price, portrait } = dataPhotographer;

   const picture = `assets/photographers/${portrait}`;

   function getUserCardDOM() {
      const photographerCard = document.createElement('article');
      photographerCard.classList.add('photographer-card');
      photographerCard.innerHTML = `
            <a href="photographer.html?id=${id}" aria-label="${name}">
                <img src="${picture}" alt="${name}">
                <h2>${name}</h2>
            </a>    
                <h3 class="location">${city}, ${country}</h3>
                <p class="tagline">${tagline}</p>
                <p class="price">${price}€/jour</p>
        `;
      return photographerCard;
   }

   function getUserDetailsDOM() {
      const photographHeader = document.createElement('section');
      photographHeader.classList.add('photograph-header');

      photographHeader.innerHTML = `
         <div class="photograph-infos">
            <h1>${name}</h1>
            <h2 class="location">${city}, ${country}</h2>
            <p class="tagline">${tagline}</p>
         </div>
            <button class="contact_button" typ  e="button">Contactez-moi</button>
            <img class="portrait" src="${picture}" alt="${name}">
         <div class="photograph-stats">
            <div class="photographer-likes">
               <span class="total-likes">0</span>
               <i class="fas fa-heart"></i>
            </div>
            <p class="price-footer">${price}€/jour</p>
         </div>
     `;

      return photographHeader;
   }

   return { name, picture, getUserCardDOM, getUserDetailsDOM };
}
