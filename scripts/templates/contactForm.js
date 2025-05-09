export function contactFormTemplate(photographerName) {
   function getFormDOM() {
      const wrapper = document.createElement('div');
      wrapper.id = 'contact_modal';
      wrapper.setAttribute('aria-hidden', 'true');
      wrapper.setAttribute('role', 'dialog');
      wrapper.setAttribute('aria-labelledby', 'contact_modal_title');

      wrapper.innerHTML = `
         <div class="modal">
            <header class="modal_header">
               <h2 id="contact_modal_title">Contactez-moi <span id="photographer-name">${photographerName}</span></h2>
               <button class="close_modal" aria-label="Fermer le formulaire de contact">
                  <img src="assets/icons/close.svg" alt="">
               </button>
            </header>
            <form>
               <div>
                  <label for="prenom">Prénom</label>
                  <input type="text" id="prenom" name="prenom" required />
               </div>
               <div>
                  <label for="nom">Nom</label>
                  <input type="text" id="nom" name="nom" required />
               </div>
               <div>
                  <label for="email">E-mail</label>
                  <input type="email" id="email" name="email" required />
               </div>
               <div>
                  <label for="message">Votre message</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
               </div>
               <button class="contact_button" type="submit">Envoyer</button>
            </form>
         </div>
      `;

      return wrapper;
   }

   return { getFormDOM };
}
