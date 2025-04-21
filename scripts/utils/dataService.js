export async function getPhotographers() {
   const response = await fetch('data/photographers.json');
   const data = await response.json();
   return data.photographers;
}

export async function getMedia() {
   const response = await fetch('data/photographers.json');
   const data = await response.json();
   return data.media;
}
