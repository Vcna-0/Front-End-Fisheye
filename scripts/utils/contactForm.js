export function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

export function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const openBtn = document.querySelector(".contact_button");
if (openBtn) openBtn.addEventListener("click", displayModal);

const closeBtn = document.querySelector(".close_modal");
if (closeBtn) closeBtn.addEventListener("click", closeModal);