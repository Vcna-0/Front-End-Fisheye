// export function displayModal() {
//    const modal = document.getElementById('contact_modal');
//    modal.style.display = 'block';

//    const main = document.querySelector('main');
//    const header = document.querySelector('header');
//    main.setAttribute('aria-hidden', 'true');
//    main.classList.add('hidden');
//    header.setAttribute('aria-hidden', 'true');
//    header.classList.add('hidden');
//    modal.setAttribute('aria-hidden', 'false');
//    modal.classList.remove('hidden');
// }

// export function closeModal() {
//    const modal = document.getElementById('contact_modal');
//    modal.style.display = 'none';

//    const main = document.querySelector('main');
//    main.setAttribute('aria-hidden', 'false');
//    main.classList.remove('hidden');
//    const header = document.querySelector('header');
//    header.setAttribute('aria-hidden', 'false');
//    header.classList.remove('hidden');
//    modal.setAttribute('aria-hidden', 'true');
//    modal.classList.add('hidden');
// }

export function displayModal() {
   const modal = document.getElementById('contact_modal');
   modal.style.display = 'block';

   modal.setAttribute('aria-hidden', 'false');
   modal.classList.remove('hidden');

   const main = document.querySelector('main');
   const header = document.querySelector('header');

   if (main) {
      main.setAttribute('inert', '');
   }
   if (header) {
      header.setAttribute('inert', '');
   }

   trapFocus(modal);

   document.body.style.overflow = 'hidden';
}

export function closeModal() {
   const modal = document.getElementById('contact_modal');
   modal.style.display = 'none';

   modal.setAttribute('aria-hidden', 'true');
   modal.classList.add('hidden');

   const main = document.querySelector('main');
   const header = document.querySelector('header');

   if (main) {
      main.removeAttribute('inert');
   }
   if (header) {
      header.removeAttribute('inert');
   }

   document.body.style.overflow = '';

   const contactButton = document.querySelector('.contact_button');
   if (contactButton) {
      contactButton.focus();
   }
}

function trapFocus(modal) {
   const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

   if (focusableElements.length === 0) return;

   const firstElement = focusableElements[0];
   const lastElement = focusableElements[focusableElements.length - 1];

   firstElement.focus();

   modal.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
         if (e.shiftKey) {
            if (document.activeElement === firstElement) {
               lastElement.focus();
               e.preventDefault();
            }
         } else {
            if (document.activeElement === lastElement) {
               firstElement.focus();
               e.preventDefault();
            }
         }
      }

      if (e.key === 'Escape') {
         closeModal();
      }
   });
}
