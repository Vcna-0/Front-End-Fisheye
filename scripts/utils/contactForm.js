export function displayModal() {
   const modal = document.getElementById('contact_modal');
   modal.style.display = 'block';

   const main = document.querySelector('main');
   const header = document.querySelector('header');
   main.setAttribute('aria-hidden', 'true');
   main.classList.add('hidden');
   header.setAttribute('aria-hidden', 'true');
   header.classList.add('hidden');
   modal.setAttribute('aria-hidden', 'false');
   modal.classList.remove('hidden');
}

export function closeModal() {
   const modal = document.getElementById('contact_modal');
   modal.style.display = 'none';

   const main = document.querySelector('main');
   main.setAttribute('aria-hidden', 'false');
   main.classList.remove('hidden');
   const header = document.querySelector('header');
   header.setAttribute('aria-hidden', 'false');
   header.classList.remove('hidden');
   modal.setAttribute('aria-hidden', 'true');
   modal.classList.add('hidden');
}

const openBtn = document.querySelector('.contact_button');
if (openBtn) openBtn.addEventListener('click', displayModal);

const closeBtn = document.querySelector('.close_modal');
if (closeBtn) closeBtn.addEventListener('click', closeModal);
