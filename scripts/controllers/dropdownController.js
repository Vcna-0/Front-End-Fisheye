const selectButton = document.getElementById('selectButton');
const selectDropdown = document.getElementById('selectDropdown');
const selectedText = document.querySelector('.selected-text');
const nativeSelect = document.getElementById('sort-select');
const options = document.querySelectorAll('.select-option');

let currentFocusedIndex = -1;
let isOpen = false;

selectButton.addEventListener('click', function () {
   toggleDropdown();
});

selectButton.addEventListener('keydown', function (event) {
   handleButtonKeydown(event);
});

function toggleDropdown() {
   if (isOpen) {
      closeDropdown();
   } else {
      openDropdown();
   }
}

function openDropdown() {
   isOpen = true;
   selectDropdown.classList.add('open');
   selectButton.classList.add('open');
   selectButton.setAttribute('aria-expanded', 'true');

   const selectedOption = document.querySelector('.select-option.selected');
   const selectedIndex = Array.from(options).indexOf(selectedOption);
   setFocusedOption(selectedIndex);
}

function closeDropdown(shouldReturnFocus = false) {
   isOpen = false;
   selectDropdown.classList.remove('open');
   selectButton.classList.remove('open');
   selectButton.setAttribute('aria-expanded', 'false');
   currentFocusedIndex = -1;

   options.forEach((opt) => opt.classList.remove('focused'));

   if (shouldReturnFocus) {
      selectButton.focus();
   }
}

function handleButtonKeydown(event) {
   switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
      case 'ArrowUp':
         event.preventDefault();
         if (!isOpen) {
            openDropdown();
         }
         break;
      case 'Escape':
         event.preventDefault();
         if (isOpen) {
            closeDropdown(true);
         }
         break;
   }
}

document.addEventListener('keydown', function (event) {
   if (!isOpen) return;

   switch (event.key) {
      case 'ArrowDown':
         event.preventDefault();
         navigateOptions(1);
         break;
      case 'ArrowUp':
         event.preventDefault();
         navigateOptions(-1);
         break;
      case 'Enter':
      case ' ':
         event.preventDefault();
         if (currentFocusedIndex >= 0) {
            selectOption(options[currentFocusedIndex]);
         }
         break;
      case 'Escape':
         event.preventDefault();
         closeDropdown(true);
         break;
   }
});

function navigateOptions(direction) {
   let newIndex = currentFocusedIndex + direction;

   if (newIndex < 0) {
      newIndex = options.length - 1;
   } else if (newIndex >= options.length) {
      newIndex = 0;
   }

   setFocusedOption(newIndex);
}

function setFocusedOption(index) {
   options.forEach((opt) => opt.classList.remove('focused'));

   if (index >= 0 && index < options.length) {
      currentFocusedIndex = index;
      options[index].classList.add('focused');

      options[index].scrollIntoView({
         block: 'nearest',
         behavior: 'smooth',
      });
   }
}

function selectOption(option) {
   const value = option.getAttribute('data-value');
   const text = option.textContent;

   selectedText.textContent = text;

   nativeSelect.value = value;

   options.forEach((opt) => {
      opt.classList.remove('selected');
      opt.setAttribute('aria-selected', 'false');
   });
   option.classList.add('selected');
   option.setAttribute('aria-selected', 'true');

   closeDropdown();

   nativeSelect.dispatchEvent(new Event('change'));
}

options.forEach((option, index) => {
   option.addEventListener('click', function () {
      selectOption(this);
   });

   option.addEventListener('mouseenter', function () {
      if (isOpen) {
         setFocusedOption(index);
      }
   });
});

document.addEventListener('click', function (event) {
   if (!document.getElementById('customSelect').contains(event.target)) {
      closeDropdown();
   }
});
