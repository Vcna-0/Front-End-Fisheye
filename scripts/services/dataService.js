export async function getPhotographers() {
   try {
      const response = await fetch('data/photographers.json');
      if (!response.ok) {
         throw new Error(`Erreur lors du chargement des données`);
      }
      const data = await response.json();
      return data.photographers;
   } catch (error) {
      console.error('Erreur lors du chargement des photographes:', error);
      throw error;
   }
}

export async function getMedia() {
   try {
      const response = await fetch('data/photographers.json');
      if (!response.ok) {
         throw new Error(`Erreur lors du chargement des données`);
      }
      const data = await response.json();
      return data.media;
   } catch (error) {
      console.error('Erreur lors du chargement des médias:', error);
      throw error;
   }
}
