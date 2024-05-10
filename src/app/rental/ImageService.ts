import { Injectable } from '@angular/core';
import { Camera, CameraPhoto, CameraResultType, CameraSource, GalleryImageOptions, GalleryPhotos } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  async pickImages(options: GalleryImageOptions): Promise<GalleryPhotos> {
    const photos: CameraPhoto[] = [];
    const cameraOptions = {
      quality: options.quality || 90,
      allowEditing: options.allowEditing || false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      width: options.width || 0,
      height: options.height || 0,
      preserveAspectRatio: options.preserveAspectRatio || false,
    };

    const image = await Camera.getPhoto(cameraOptions);

    for (const photo of image.) {
      photos.push({
        filepath: photo.webPath,
        webviewPath: photo.webPath
      });
    }

    return {
      photos,
      method: 'pick'
    };
  }
}
