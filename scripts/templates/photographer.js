export function photographerTemplate(data) {
   const { name, id, city, country, tagline, price, portrait } = data;

   const picture = `assets/photographers/${portrait}`;

   function getUserCardDOM() {
      const article = document.createElement('article');
      article.classList.add('photographer-card');
      article.innerHTML = `
            <a href="photographer.html?id=${id}" aria-label="${name}">
                <img src="${picture}"">
                <h2>${name}</h2>
            </a>    
                <p class="location">${city}, ${country}</p>
                <p class="tagline">${tagline}</p>
                <p class="price">${price}€/jour</p>
        `;
      return article;
   }

   function getUserDetailsDOM() {
      const section = document.createElement('section');
      section.classList.add('photograph-header');

      section.innerHTML = `
            <div class="photograph-infos">
                <h1>${name}</h1>
                <p class="location">${city}, ${country}</p>
                <p class="tagline">${tagline}</p>
            </div>
            <button class="contact_button">Contactez-moi</button>
            <p class="price-footer">${price}€/jour</p>
            <img class="" src="${picture}" alt="${name}">
        `;

      return section;
   }

   return { name, picture, getUserCardDOM, getUserDetailsDOM };
}
