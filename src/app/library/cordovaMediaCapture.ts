import {
  MediaCapture,
  CaptureImageOptions,
  CaptureAudioOptions,
  CaptureVideoOptions
} from '@ionic-native/media-capture';
import { Injectable } from '@angular/core';

@Injectable()

export class CordovaMediaCapture {

  constructor(private mediaCapture: MediaCapture) {

  }

  private videoOptions(): CaptureVideoOptions {
    let options: CaptureVideoOptions = {
      //limit: 3,
      //duration: 3,
      //quality: 3,
    };
    return options;
  }

  private audioOptions(): CaptureAudioOptions {
    let options: CaptureAudioOptions = {
      //limit: 3,
      //duration: 3,
    };
    return options;
  }

  private imageOptions(): CaptureImageOptions {
    let options: CaptureImageOptions = {
      //limit: 3,
    };
    return options;
  }

  public recordVideo(): Promise<any> {
    return this.mediaCapture.captureVideo(this.videoOptions);
  }

  public recordImage(): Promise<any> {
    return this.mediaCapture.captureImage(this.imageOptions);
  }

  public audioImage(): Promise<any> {
    return this.mediaCapture.captureAudio(this.audioOptions);
  }
}