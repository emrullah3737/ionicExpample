import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()

export class CordovaCamera {

  private options: CameraOptions;

  constructor(private camera: Camera) {
    console.log('Camera constructor');
    this.setOption();
  }
  private setOption() {
    this.options = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
  }

  public getPicture() {
    return new Promise((res, rej) => {
      this.camera.getPicture(this.options).then((imageData: string) => {
        const base64Image: string = 'data:image/jpeg;base64,' + imageData;
        res(base64Image);
      }, (err) => {
        rej(err);
      });
    });
  }
}