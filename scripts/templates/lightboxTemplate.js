export function createLightboxDOM() {
   const element = document.createElement('div');
   element.className = 'lightbox hidden';
   element.setAttribute('role', 'dialog');
   element.setAttribute('aria-hidden', 'true');
   element.setAttribute('aria-label', 'Vue agrandie du média');
   element.innerHTML = `
      <button type="button" class="lightbox-close" aria-label="Fermer la lightbox">&times;</button>
      <div class="lightbox-content">
         <button type="button" class="lightbox-prev" aria-label="Média précédent">&#10094;</button>
         <div class="lightbox-media-container"></div>
         <button type="button" class="lightbox-next" aria-label="Média suivant">&#10095;</button>
      </div>
   `;
   return element;
}
