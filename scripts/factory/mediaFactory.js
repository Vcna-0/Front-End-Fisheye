import { PhotoMedia } from '../models/PhotoMedia.js';
import { VideoMedia } from '../models/VideoMedia.js';

export function mediaFactory(mediaData, photographerData, index, lightbox, updateTotalLikes) {
   const { image, video } = mediaData;

   if (image) {
      return new PhotoMedia(mediaData, photographerData, index, lightbox, updateTotalLikes);
   } else if (video) {
      return new VideoMedia(mediaData, photographerData, index, lightbox, updateTotalLikes);
   } else {
      throw new Error('Type de média non supporté');
   }
}
